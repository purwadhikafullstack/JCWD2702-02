import { prisma } from './../../lib/PrismaClient';
import { IAddProductStock, IReduceProductStock, IManualStockRequest } from './StockTypes';
import { StockStatus } from '@prisma/client';

// Query for get stock history
export const getStockHistoryQuery = async () => {
    return await prisma.stockHistory.findMany({ include: { Product: true, from: true, to: true } });
}

// Query for add product stock
export const addProductStockQuery = async ({ productId, quantity, toId }: IAddProductStock) => {
    return await prisma.stockHistory.create({
        data: {
            productId: productId,
            quantity: quantity,
            status: 'ACCEPTED',
            fromId: 6,
            toId: toId,
        }
    });
}

// Query for reduce product stock
export const reduceProductStockQuery = async ({ productId, quantity, fromId }: IReduceProductStock) => {
    const totalStockPerFromWarehouse = await getTotalStockPerFromWarehouseQuery(productId, fromId);
    if (totalStockPerFromWarehouse < quantity) throw new Error('Cannot reduce stock more than the current available stock');
    const reduceStock = await prisma.stockHistory.create({
        data: {
            productId: productId,
            quantity: quantity,
            status: 'ACCEPTED',
            fromId: fromId,
            toId: 6,
        }
    });
    return {
        totalStockPerFromWarehouse
    }
}

// New query for calculating total stock for a specific product and warehouse
const getTotalStockPerFromWarehouseQuery = async (productId: number, warehouseId: number) => {
    const stockRecords = await prisma.stockHistory.findMany({
        where: { AND: [{ productId: productId }, { status: 'ACCEPTED' }, { OR: [{ fromId: warehouseId }, { toId: warehouseId }] }] }
    });

    let totalStock = 0;
    for (const record of stockRecords) {
        totalStock += record.toId === warehouseId ? record.quantity : -record.quantity;
    }
    return totalStock;
}

// Query for manual stock request from warehouse to another warehouse
export const manualStockRequestQuery = async ({ productId, quantity, fromId, toId }: IManualStockRequest) => {
    return await prisma.stockHistory.create({
        data: {
            productId: productId,
            quantity: quantity,
            status: 'PENDING',
            fromId: fromId,
            toId: toId,
        }
    });
}

// Query for accept stock request
export const acceptStockRequestQuery = async (stockHistoryId: string) => {
    const getManualStockRequest = await prisma.stockHistory.findUnique({
        where: { id: Number(stockHistoryId) }
    })

    if (!getManualStockRequest) {
        throw new Error('Stock request not found');
    }

    const totalStockPerFromWarehouse = await getTotalStockPerFromWarehouseQuery(getManualStockRequest.productId, getManualStockRequest.fromId);
    if (totalStockPerFromWarehouse < getManualStockRequest.quantity) throw new Error('Insufficient stock, need to be rejected');

    return await prisma.stockHistory.update({
        where: { id: Number(stockHistoryId) },
        data: { status: 'ACCEPTED' }
    })
}

// Query for reject stock request
export const rejectStockRequestQuery = async (stockHistoryId: string) => {
    return await prisma.stockHistory.update({
        where: { id: Number(stockHistoryId) },
        data: { status: 'REJECTED' }
    });
}

// Query for get all stock request
export const getAllStockRequestQuery = async () => {
    return await prisma.stockHistory.findMany({
        where: { status: 'PENDING' },
        include: {
            Product: true,
            from: { include: { warehouse: true } },
            to: { include: { warehouse: true } }
        }
    });
}

// Function to calculate the Haversine distance between two points
export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (value: number): number => value * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon1 - lon2);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Query for get closest warehouse from order Address
export const getClosestWarehouseQuery = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { address: true, items: { include: { product: true } } }
    });

    if (!order) throw new Error('Order not found');
    const { latitude: orderLat, longitude: orderLong } = order.address;
    if (orderLat == null || orderLong == null) throw new Error('Order address coordinates not found');

    const warehouses = await prisma.warehouse.findMany();

    let closestWarehouse = null;
    let closestDistance = Infinity;
    for (const warehouse of warehouses) {
        const distance = parseFloat(haversineDistance(parseFloat(orderLat), parseFloat(orderLong), warehouse.latitude, warehouse.longitude).toFixed(2));
        if (distance < closestDistance) {
            closestDistance = distance;
            closestWarehouse = warehouse;
        }
    }
    return { order, closestWarehouse, closestDistance };
}

// Query for create lists of warehouse (sort terdekat ke terjauh warehouse pengirim)
export const getListOfWarehouseSortedByDistanceQuery = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { address: true, items: { include: { product: true } } }
    });
    if (!order) throw new Error('Order not found');
    const { latitude: orderLat, longitude: orderLong } = order.address;
    if (orderLat == null || orderLong == null) throw new Error('Order address coordinates not found');
    const warehouses = await prisma.warehouse.findMany();
    const sortedWarehouses = warehouses.sort((a, b) => {
        const distanceA = parseFloat(haversineDistance(parseFloat(orderLat), parseFloat(orderLong), a.latitude, a.longitude).toFixed(2));
        const distanceB = parseFloat(haversineDistance(parseFloat(orderLat), parseFloat(orderLong), b.latitude, b.longitude).toFixed(2));
        return distanceA - distanceB;
    });
    return sortedWarehouses;
}

// Query for automatic stock request from closest warehouse to Customer/Partner
export const orderStockHistoryQuery = async (orderId: number) => {
    const closestWarehouseResult = await getClosestWarehouseQuery(orderId);
    const listOfWarehouseSortedByDistance = await getListOfWarehouseSortedByDistanceQuery(orderId);
    const items = closestWarehouseResult?.order?.items;

    if (!items) throw new Error('No items found in the order');

    const createStockHistoryData = [];
    const closestWarehouseId = Number(closestWarehouseResult?.closestWarehouse?.id);

    for (const item of items) {
        const productId = item.product.id;
        let quantityNeeded = item.quantity;

        const totalStockClosestWarehouse = await getTotalStockPerFromWarehouseQuery(productId, closestWarehouseId);
        if (quantityNeeded <= totalStockClosestWarehouse) {
            createStockHistoryData.push({
                productId: productId,
                quantity: quantityNeeded,
                fromId: closestWarehouseId,
                toId: 7,
                status: StockStatus.ACCEPTED
            });
        } else {
            let remainingQuantity = quantityNeeded - totalStockClosestWarehouse;

            for (const warehouse of listOfWarehouseSortedByDistance) {
                if (remainingQuantity <= 0) break;
                if (Number(warehouse.id) === closestWarehouseId) continue;

                const totalStockOtherWarehouse = await getTotalStockPerFromWarehouseQuery(productId, Number(warehouse.id));
                if (totalStockOtherWarehouse > 0) {
                    const quantityToTake = Math.min(remainingQuantity, totalStockOtherWarehouse);
                    remainingQuantity -= quantityToTake;
                    createStockHistoryData.push({
                        productId: productId,
                        quantity: quantityToTake,
                        fromId: Number(warehouse.id),
                        toId: closestWarehouseId,
                        status: StockStatus.ACCEPTED
                    });
                }
            }
            createStockHistoryData.push({
                productId: productId,
                quantity: item.quantity,
                fromId: closestWarehouseId,
                toId: 7,
                status: StockStatus.ACCEPTED
            });
        }
    }
    const createStockHistoryPerProduct = await prisma.stockHistory.createMany({
        data: createStockHistoryData
    });
    return createStockHistoryPerProduct;
};

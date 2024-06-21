import { prisma } from './../../lib/PrismaClient';
import { IAddProductStock, IReduceProductStock, IManualStockRequest } from './StockTypes';

// Query for get stock history
export const getStockHistoryQuery = async () => {
    return await prisma.stockHistory.findMany(
        {
            include: {
                Product: true,
                from: true,
                to: true
            }
        }
    );
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
    const getTotalStockPerFromWarehouse = await prisma.stockHistory.findMany({
        where: {
            AND: [
                {
                    productId: productId
                },
                {
                    status: 'ACCEPTED'
                },
                {
                    OR: [
                        { fromId: Number(fromId) },
                        { toId: Number(fromId) }
                    ]
                }
            ]
        }
    })

    let totalStockPerFromWarehouse = 0;

    for (const record of getTotalStockPerFromWarehouse) {
        if (record.toId === fromId) {
            totalStockPerFromWarehouse += record.quantity;
        }
        if (record.fromId === fromId) {
            totalStockPerFromWarehouse -= record.quantity;
        }
    }

    let reduceStock;

    if (totalStockPerFromWarehouse < quantity) {
        throw new Error('Cannot reduce stock more than the current available stock');
    } else {
        reduceStock = await prisma.stockHistory.create({
            data: {
                productId: productId,
                quantity: totalStockPerFromWarehouse,
                status: 'ACCEPTED',
                fromId: fromId,
                toId: 6,
            }
        })
    }

    return ({
        totalStockPerFromWarehouse: totalStockPerFromWarehouse
    })
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
        where: {
            id: Number(stockHistoryId)
        }
    })

    if (!getManualStockRequest) {
        throw new Error('Stock request not found');
    }

    const getTotalStockPerFromWarehouse = await prisma.stockHistory.findMany({
        where: {
            AND: [
                {
                    productId: getManualStockRequest.productId
                },
                {
                    status: 'ACCEPTED'
                },
                {
                    OR: [
                        { fromId: Number(getManualStockRequest?.fromId) },
                        { toId: Number(getManualStockRequest?.fromId) }
                    ]
                }
            ]
        }
    })

    let totalStockPerFromWarehouse = 0;

    for (const record of getTotalStockPerFromWarehouse) {
        if (record.toId === getManualStockRequest.fromId) {
            totalStockPerFromWarehouse += record.quantity;
        }
        if (record.fromId === getManualStockRequest.fromId) {
            totalStockPerFromWarehouse -= record.quantity;
        }
    }

    let acceptStockRequest;

    if (totalStockPerFromWarehouse < getManualStockRequest.quantity) {
        throw new Error('Insufficient stock, need to be rejected');
    } else {
        acceptStockRequest = await prisma.stockHistory.update({
            where: {
                id: Number(stockHistoryId)
            },
            data: {
                status: 'ACCEPTED'
            }
        })
    }
    return acceptStockRequest
}

// Query for reject stock request
export const rejectStockRequestQuery = async (stockHistoryId: string) => {
    return await prisma.stockHistory.update({
        where: {
            id: Number(stockHistoryId)
        },
        data: {
            status: 'REJECTED'
        }
    });
}

// Query for get all stock request
export const getAllStockRequestQuery = async () => {
    return await prisma.stockHistory.findMany({
        where: {
            status: 'PENDING'
        },
        include: {
            Product: true,
            from: {
                include: {
                    warehouse: true
                }
            },
            to: {
                include: {
                    warehouse: true
                }
            }
        }
    });
}
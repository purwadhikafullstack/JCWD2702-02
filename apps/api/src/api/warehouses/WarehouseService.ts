import { prisma } from './../../lib/PrismaClient';

// Query for get all warehouses
export const getWarehousesQuery = async () => {
    return await prisma.warehouse.findMany();
}

// Query to get mutation type lists where warehouseId is not null and not a specific warehouseId
export const getStockMutationTypeQuery = async (warehouseId: string) => {
    return await prisma.mutation_Type.findMany({
        where: {
            AND: [
                {
                    warehouseId: {
                        not: null
                    }
                },
                {
                    warehouseId: {
                        not: Number(warehouseId)
                    }
                }
            ]
        },
        include: {
            warehouse: true
        }
    });
}

// Query for get all products (stock per warehouse)
export const getProductsPerWarehouseQuery = async (warehouseId?: string) => {
    const products = await prisma.product.findMany({
        include: {
            stockHistory: {
                where: {
                    AND: [
                        {
                            status: 'ACCEPTED'
                        },
                        {
                            OR: [
                                { fromId: Number(warehouseId) },
                                { toId: Number(warehouseId) }
                            ]
                        }
                    ],
                }
            }
        },
    });

    const productsWithTotalStock = products.map(product => {
        let totalStock = 0;
        for (let stock of product.stockHistory) {
            if (stock.fromId === Number(warehouseId)) {
                totalStock -= stock.quantity;
            } else if (stock.toId === Number(warehouseId)) {
                totalStock += stock.quantity;
            }
        }

        return {
            ...product,
            totalStock: totalStock
        };
    });

    return { products: productsWithTotalStock };
};

// Query for get stockHistory by product Id and warehouse Id
export const getStockHistoryByProductIdAndWarehouseIdQuery = async (productId: string, warehouseId: string) => {
    const stockHistory = await prisma.stockHistory.findMany({
        where: {
            productId: Number(productId),
            OR: [
                {
                    AND: [
                        { fromId: Number(warehouseId) },
                        { status: { in: ['ACCEPTED', 'REJECTED'] } }
                    ]
                },
                {
                    AND: [
                        { toId: Number(warehouseId) },
                        { status: { in: ['ACCEPTED', 'REJECTED'] } }
                    ]
                }
            ]
        },
        include: {
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

    const product = await prisma.product.findUnique({
        where: { id: Number(productId) }
    });

    return { product, stockHistory };
}

// Query for get warehouse by id
export const getWarehouseByIdQuery = async (id: string) => {
    return await prisma.warehouse.findUnique({
        where: { id: parseInt(id) },
    });
}

// Query for get stock request by warehouseId
export const getStockRequestByWarehouseIdQuery = async (warehouseId: string) => {
    return await prisma.stockHistory.findMany({
        where: {
            AND: [
                { fromId: Number(warehouseId) },
                { status: 'PENDING' }
            ]
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
    })
}

// Query for get outgoing stock request by warehouseId
export const getOutgoingStockRequestByWarehouseIdQuery = async (warehouseId: string) => {
    return await prisma.stockHistory.findMany({
        where: {
            AND: [
                { toId: Number(warehouseId) },
                { status: 'PENDING' }
            ]
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
    })
}
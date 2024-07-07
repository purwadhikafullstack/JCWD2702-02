import { prisma } from './../../lib/PrismaClient';
import { Prisma } from '@prisma/client';

// Query for get all warehouses
export const getWarehousesQuery = async () => {
    return await prisma.warehouse.findMany();
}

// Query to get mutation type lists where warehouseId is not null and not a specific warehouseId
export const getStockMutationTypeQuery = async (warehouseId: string) => {
    return await prisma.mutation_Type.findMany({
        where: {
            AND: [
                { warehouseId: { not: null } },
                { warehouseId: { not: Number(warehouseId) } }
            ]
        },
        include: { warehouse: true }
    });
}

// Query for get all products (stock per warehouse)
export const getProductsPerWarehouseQuery = async (warehouseId?: string, sort?: string, search?: string, page?: number) => {
    const itemsPerPage = 10;
    const skip = (Number(page) - 1) * itemsPerPage;

    const whereCriteria: Prisma.ProductWhereInput = {
        name: { contains: search }
    };

    const products = await prisma.product.findMany({
        where: whereCriteria,
        include: {
            stockHistory: {
                where: {
                    AND: [
                        { status: 'ACCEPTED' },
                        { OR: [{ fromId: Number(warehouseId) }, { toId: Number(warehouseId) }] },
                    ],
                },
            },
        },
        skip: skip,
        take: itemsPerPage,
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
            totalStock: totalStock,
        };
    });

    if (sort === 'stock_low_high') {
        productsWithTotalStock.sort((a, b) => a.totalStock - b.totalStock);
    } else if (sort === 'stock_high_low') {
        productsWithTotalStock.sort((a, b) => b.totalStock - a.totalStock);
    }

    return { products: productsWithTotalStock };
};

// Query for get stockHistory by product Id and warehouse Id
export const getStockHistoryByProductIdAndWarehouseIdQuery = async (productId: string, warehouseId: string, month?: string, year?: string) => {
    const whereClause: Prisma.stockHistoryWhereInput = {
        productId: Number(productId),
        OR: [
            { AND: [{ fromId: Number(warehouseId) }, { status: { in: ['ACCEPTED', 'REJECTED'] } }] },
            { AND: [{ toId: Number(warehouseId) }, { status: { in: ['ACCEPTED', 'REJECTED'] } }] }
        ]
    };

    if (month && year) {
        const startDate = new Date(Number(year), Number(month) - 1, 1);
        const endDate = new Date(Number(year), Number(month), 0);
        whereClause.createdAt = {
            gte: startDate,
            lt: endDate
        };
    }

    const stockHistory = await prisma.stockHistory.findMany({
        where: whereClause,
        include: {
            from: { include: { warehouse: true } },
            to: { include: { warehouse: true } }
        },
        orderBy: [{ createdAt: 'asc' }]
    });

    const product = await prisma.product.findUnique({
        where: { id: Number(productId) }
    });

    const fromSum = await prisma.stockHistory.aggregate({
        where: {
            productId: Number(productId),
            fromId: Number(warehouseId),
            status: { in: ['ACCEPTED', 'REJECTED'] },
            ...(month && year && {
                createdAt: {
                    gte: new Date(Number(year), Number(month) - 1, 1),
                    lt: new Date(Number(year), Number(month), 0)
                }
            })
        },
        _sum: { quantity: true }
    });

    const toSum = await prisma.stockHistory.aggregate({
        where: {
            productId: Number(productId),
            toId: Number(warehouseId),
            status: { in: ['ACCEPTED', 'REJECTED'] },
            ...(month && year && {
                createdAt: {
                    gte: new Date(Number(year), Number(month) - 1, 1),
                    lt: new Date(Number(year), Number(month), 0)
                }
            })
        },
        _sum: { quantity: true }
    });

    const currentStock = (toSum._sum.quantity || 0) - (fromSum._sum.quantity || 0);

    return { product, stockHistory, fromSum: fromSum._sum.quantity, toSum: toSum._sum.quantity, currentStock };
};

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
            from: { include: { warehouse: true } },
            to: { include: { warehouse: true } }
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
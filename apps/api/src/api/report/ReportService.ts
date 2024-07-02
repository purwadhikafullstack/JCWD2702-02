import { prisma } from './../../lib/PrismaClient';

// Query for get all revenues period
export const getRevenuesQuery = async () => {
    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const totalRevenueYear = await prisma.orderItem.aggregate({
        _sum: { totalAmount: true },
        where: { order: { createdAt: { gte: startOfYear, lte: now } } }
    });

    const totalRevenueMonth = await prisma.orderItem.aggregate({
        _sum: { totalAmount: true },
        where: { order: { createdAt: { gte: startOfMonth, lte: now } } }
    });

    const totalRevenueDay = await prisma.orderItem.aggregate({
        _sum: { totalAmount: true },
        where: { order: { createdAt: { gte: startOfDay, lte: now } } }
    });

    return {
        totalRevenueYear: totalRevenueYear._sum.totalAmount || 0,
        totalRevenueMonth: totalRevenueMonth._sum.totalAmount || 0,
        totalRevenueDay: totalRevenueDay._sum.totalAmount || 0
    };
}

// Query for get revenues per warehouse period
export const getRevenuesPerWarehouseQuery = async (warehouseId: number) => {
    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const totalRevenueYear = await prisma.orderItem.aggregate({
        _sum: { totalAmount: true },
        where: { order: { createdAt: { gte: startOfYear, lte: now }, stockHistory: { some: { fromId: warehouseId } } } }
    });

    const totalRevenueMonth = await prisma.orderItem.aggregate({
        _sum: { totalAmount: true },
        where: { order: { createdAt: { gte: startOfMonth, lte: now }, stockHistory: { some: { fromId: warehouseId } } } }
    });

    const totalRevenueDay = await prisma.orderItem.aggregate({
        _sum: { totalAmount: true },
        where: { order: { createdAt: { gte: startOfDay, lte: now }, stockHistory: { some: { fromId: warehouseId } } } }
    });

    return {
        totalRevenueYear: totalRevenueYear._sum.totalAmount || 0,
        totalRevenueMonth: totalRevenueMonth._sum.totalAmount || 0,
        totalRevenueDay: totalRevenueDay._sum.totalAmount || 0
    };
}

// Query for get list of existing products
export const getExistingProductsQuery = async () => {
    return await prisma.product.findMany({ orderBy: { name: 'asc' } });
}

// Query for get list of existing Categories
export const getExistingCategoriesQuery = async () => {
    return await prisma.category.findMany({});
}

// Query for get all orders
export const getRecentOrdersQuery = async () => {
    return await prisma.order.findMany({
        include: {
            address: true,
            user: true,
            items: { include: { product: { include: { Categories: true } } } }
        },
        orderBy: { createdAt: 'desc' },
        take: 7
    });
}

// Query for get recent orders per warehouse
export const getRecentOrdersPerWarehouseQuery = async (warehouseId: number) => {
    return await prisma.order.findMany({
        where: { stockHistory: { some: { fromId: warehouseId } } },
        include: {
            address: true,
            user: true,
            items: { include: { product: { include: { Categories: true } } } }
        },
        orderBy: { createdAt: 'desc' },
        take: 7
    });
}

// Query get orders per month (january - december)
export const getOrdersPerMonthQuery = async (categoryId?: number, productId?: number) => {
    const resultSalesArray = [];
    const now = new Date();
    const year = now.getFullYear();

    if (categoryId) {
        for (let i = 1; i <= 12; i++) {
            const startDate = new Date(year, i - 1, 1);
            const endDate = new Date(year, i, 0, 23, 59, 59);
            const resultSalesPerCategory = await prisma.orderItem.aggregate({
                _sum: { totalAmount: true },
                where: {
                    product: { categoryId: categoryId },
                    order: { createdAt: { gte: startDate, lte: endDate, }, },
                },
            });
            resultSalesArray.push(resultSalesPerCategory._sum.totalAmount || 0);
        }
    } else if (productId) {
        for (let i = 1; i <= 12; i++) {
            const startDate = new Date(year, i - 1, 1);
            const endDate = new Date(year, i, 0, 23, 59, 59);
            const resultSalesPerProduct = await prisma.orderItem.aggregate({
                _sum: { totalAmount: true },
                where: {
                    AND: [
                        { productId: productId },
                        { order: { createdAt: { gte: startDate, lte: endDate } } }
                    ]
                }
            });
            resultSalesArray.push(resultSalesPerProduct._sum.totalAmount || 0);
        }
    } else {
        for (let i = 1; i <= 12; i++) {
            const startDate = new Date(year, i - 1, 1);
            const endDate = new Date(year, i, 0, 23, 59, 59);

            const resultSales = await prisma.order.aggregate({
                _sum: { totalOrderAmount: true },
                where: { createdAt: { gte: startDate, lte: endDate } }
            });

            resultSalesArray.push(resultSales._sum.totalOrderAmount || 0);
        }
    }

    return {
        sales: resultSalesArray,
    };
}

// Query get orders per month per warehouse (january - december)
export const getOrdersPerMonthPerWarehouseQuery = async (categoryId?: number, productId?: number, warehouseId?: number) => {
    const resultSalesArray = [];
    const now = new Date();
    const year = now.getFullYear();

    const getResultSales = async (startDate: Date, endDate: Date, whereCondition: object) => {
        const resultSales = await prisma.orderItem.aggregate({
            _sum: { totalAmount: true },
            where: {
                AND: [
                    whereCondition,
                    { order: { createdAt: { gte: startDate, lte: endDate } } },
                    { order: { stockHistory: { some: { fromId: warehouseId } } } }
                ]
            }
        });
        return resultSales._sum.totalAmount || 0;
    };

    if (categoryId) {
        for (let i = 1; i <= 12; i++) {
            const startDate = new Date(year, i - 1, 1);
            const endDate = new Date(year, i, 0, 23, 59, 59);
            const resultSalesPerCategory = await getResultSales(startDate, endDate, { product: { categoryId: categoryId } });
            resultSalesArray.push(resultSalesPerCategory);
        }
    } else if (productId) {
        for (let i = 1; i <= 12; i++) {
            const startDate = new Date(year, i - 1, 1);
            const endDate = new Date(year, i, 0, 23, 59, 59);
            const resultSalesPerProduct = await getResultSales(startDate, endDate, { productId: productId });
            resultSalesArray.push(resultSalesPerProduct);
        }
    } else {
        for (let i = 1; i <= 12; i++) {
            const startDate = new Date(year, i - 1, 1);
            const endDate = new Date(year, i, 0, 23, 59, 59);

            const resultSales = await prisma.order.aggregate({
                _sum: { totalOrderAmount: true },
                where: {
                    AND: [
                        { createdAt: { gte: startDate, lte: endDate } },
                        { stockHistory: { some: { fromId: warehouseId } } }
                    ]
                }
            });

            resultSalesArray.push(resultSales._sum.totalOrderAmount || 0);
        }
    }

    return {
        sales: resultSalesArray,
    };
};

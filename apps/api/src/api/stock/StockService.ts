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
    return await prisma.stockHistory.create({
        data: {
            productId: productId,
            quantity: quantity,
            status: 'ACCEPTED',
            fromId: fromId,
            toId: 6,
        }
    });
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
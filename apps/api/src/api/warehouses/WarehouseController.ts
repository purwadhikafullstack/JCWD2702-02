import { Request, Response, NextFunction } from 'express';
import { getWarehousesQuery, getOutgoingStockRequestByWarehouseIdQuery, getStockMutationTypeQuery, getStockRequestByWarehouseIdQuery, getStockHistoryByProductIdAndWarehouseIdQuery, getWarehouseByIdQuery, getProductsPerWarehouseQuery } from './WarehouseService';
import { prisma } from '@/lib/PrismaClient';

// Controller for get all warehouses
export const getWarehouses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const warehouses = await getWarehousesQuery();
        res.status(200).send({
            count: warehouses.length,
            error: false,
            message: 'Get warehouses',
            data: warehouses
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get Mutation Type lists for warehouse stock request
export const getStockMutationType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { warehouseId } = req.params
        const stockMutationTypes = await getStockMutationTypeQuery(warehouseId);
        res.status(200).send({
            error: false,
            message: 'Get Stock Mutation Type Lists',
            data: stockMutationTypes
        })
    } catch (error) {
        next(error);
    }
}

// Controller for get all products (stock per warehouse)
export const getProductsPerWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { warehouseId } = req.params
        const { sort, search, page } = req.query
        const pageNum = page ? parseInt(page as string) : 1;
        const productsWithStocksPerWarehouse = await getProductsPerWarehouseQuery(warehouseId as string | undefined, sort as string, search as string, pageNum);
        const productsCount = await prisma.product.count();
        res.status(200).send({
            count: productsCount,
            error: false,
            message: 'Get Products with stocks per warehouse',
            data: productsWithStocksPerWarehouse
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Controller for get stockHistory by product Id and warehouse Id
export const getStockHistoryByProductIdAndWarehouseId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, warehouseId } = req.params
        const { month, year } = req.query;
        const stockHistory = await getStockHistoryByProductIdAndWarehouseIdQuery(productId, warehouseId, month as string, year as string);
        res.status(200).send({
            error: false,
            message: 'Get Stock History',
            data: stockHistory
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Controller for get warehouse by id
export const getWarehouseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const warehouse = await getWarehouseByIdQuery(id);
        if (!warehouse) throw new Error('Cannot get warehouse, warehouse not found');
        return res.status(200).send({
            error: false,
            message: 'Get Warehouse',
            data: warehouse
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get stock request by warehouseId
export const getStockRequestByWarehouseId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { warehouseId } = req.params
        const stockRequest = await getStockRequestByWarehouseIdQuery(warehouseId);
        res.status(200).send({
            error: false,
            message: 'Get Stock Request',
            data: stockRequest
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get outgoing stock request by warehouseId
export const getOutgoingStockRequestByWarehouseId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { warehouseId } = req.params
        const outgoingStockRequest = await getOutgoingStockRequestByWarehouseIdQuery(warehouseId);
        res.status(200).send({
            error: false,
            message: 'Get Stock Request',
            data: outgoingStockRequest
        });
    } catch (error) {
        next(error);
    }
}
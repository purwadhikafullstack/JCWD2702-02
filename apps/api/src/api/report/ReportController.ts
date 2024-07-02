import { Request, Response, NextFunction } from 'express';

import { getRecentOrdersQuery, getRecentOrdersPerWarehouseQuery, getExistingProductsQuery, getRevenuesPerWarehouseQuery, getExistingCategoriesQuery, getOrdersPerMonthQuery, getOrdersPerMonthPerWarehouseQuery, getRevenuesQuery } from './ReportService';

// Controller for get all revenues period
export const getRevenues = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getReportResult = await getRevenuesQuery();
        res.status(200).send({
            error: false,
            message: 'Get Report',
            data: getReportResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get revenues per warehouse period
export const getRevenuesPerWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const warehouseId = Number(req.params.warehouseId);
        const getReportResult = await getRevenuesPerWarehouseQuery(warehouseId);
        res.status(200).send({
            error: false,
            message: 'Get Report',
            data: getReportResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get list of existing products (FOR DROPDOWN)
export const getExistingProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getReportResult = await getExistingProductsQuery();
        res.status(200).send({
            error: false,
            message: 'Get Report',
            data: getReportResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get list of existing categories (FOR DROPDOWN)
export const getExistingCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getReportResult = await getExistingCategoriesQuery();
        res.status(200).send({
            error: false,
            message: 'Get Report',
            data: getReportResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get all orders
export const getRecentOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getReportResult = await getRecentOrdersQuery();
        res.status(200).send({
            error: false,
            message: 'Get Report',
            data: getReportResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get all orders per warehouse
export const getRecentOrdersPerWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const warehouseId = Number(req.params.warehouseId);
        const getReportResult = await getRecentOrdersPerWarehouseQuery(warehouseId);
        res.status(200).send({
            error: false,
            message: 'Get Report',
            data: getReportResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get orders per month
export const getOrdersPerMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
        const productId = req.query.productId ? Number(req.query.productId) : undefined;

        const getReportResult = await getOrdersPerMonthQuery(categoryId, productId);
        res.status(200).send({
            error: false,
            message: 'Get Report per month',
            data: getReportResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for get orders per month per warehouse
export const getOrdersPerMonthPerWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const warehouseId = Number(req.params.warehouseId);
        const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
        const productId = req.query.productId ? Number(req.query.productId) : undefined;

        const getReportResult = await getOrdersPerMonthPerWarehouseQuery(categoryId, productId, warehouseId);
        res.status(200).send({
            error: false,
            message: 'Get Report per month',
            data: getReportResult
        });
    } catch (error) {
        next(error);
    }
}
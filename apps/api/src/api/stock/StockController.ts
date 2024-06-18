import { Request, Response, NextFunction } from 'express';
import { addProductStockQuery, getStockHistoryQuery, reduceProductStockQuery, manualStockRequestQuery } from './StockService';

// Controller for get stockHistory
export const getStockHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getStockHistoryResult = await getStockHistoryQuery();
        res.status(200).send({
            error: false,
            message: 'Get Stock History',
            data: getStockHistoryResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for add product stock
export const addProductStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { quantity, productId, toId } = req.body;
        const addProductStockResult = await addProductStockQuery({ productId, quantity, toId });
        res.status(200).send({
            error: false,
            message: 'Stock added successfully',
            data: addProductStockResult
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Controller for reduce product stock
export const reduceProductStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { quantity, productId, fromId } = req.body;
        const reduceProductStockResult = await reduceProductStockQuery({ productId, quantity, fromId });
        res.status(200).send({
            error: false,
            message: 'Stock reduced successfully',
            data: reduceProductStockResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for manual stock request from warehouse to another warehouse
export const manualStockRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { quantity, productId, fromId, toId } = req.body;
        const reduceProductStockResult = await manualStockRequestQuery({ productId, quantity, fromId, toId });
        res.status(200).send({
            error: false,
            message: 'Stock request form sent successfully',
            data: reduceProductStockResult
        });
    } catch (error) {
        next(error);
    }
}
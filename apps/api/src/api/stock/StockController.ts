import { Request, Response, NextFunction } from 'express';
import { addProductStockQuery, getListOfWarehouseSortedByDistanceQuery, getStockHistoryQuery, getAllStockRequestQuery, reduceProductStockQuery, manualStockRequestQuery, acceptStockRequestQuery, rejectStockRequestQuery, orderStockHistoryQuery } from './StockService';

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

// Controller for accept stock request
export const acceptStockRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const acceptStockRequestResult = await acceptStockRequestQuery(id);
        res.status(200).send({
            error: false,
            message: 'Stock request form accepted successfully',
            data: acceptStockRequestResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for reject stock request
export const rejectStockRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const rejectStockRequestResult = await rejectStockRequestQuery(id);
        res.status(200).send({
            error: false,
            message: 'Stock request form rejected successfully',
            data: rejectStockRequestResult
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Controller for get all stock request
export const getAllStockRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getAllStockRequestResult = await getAllStockRequestQuery();
        res.status(200).send({
            count: getAllStockRequestResult.length,
            error: false,
            message: 'Get All Stock Request',
            data: getAllStockRequestResult
        });
    } catch (error) {
        next(error);
    }
}

// Controller for automatic stock request
export const automaticStockRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.body;
        const orderStockHistory = await orderStockHistoryQuery(orderId);

        res.status(200).send({
            error: false,
            message: 'Automatic stock request sent successfully',
            data: orderStockHistory
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// 1. dapetin closest warehouse dari addressId di Order sebagai warehouse pengirim ke address user
// 2. get orderItems by orderId di table order, looping/createmany stockHistory berdasarkan banyaknya orderitems dengan status = PENDING
// 3. cek untuk setiap orderItems, kalau stock cukup, status = ACCEPTED
// 4. kalau stock tidak cukup, buat list of warehouse (sort terdekat ke terjauh warehouse pengirim)
// 5. looping dari list setiap warehouse, untuk create stockHistory (status Acc)
// 6. kalo stock dari warehouse pengirim sudah mencukupi demand user, ubah status stockHistory ke customer menjadi ACCEPTED

// kalo user di menaggio village,
// 1. ke gudang SAFE n LOCK : +- 815km
// 2. ke sentral singosari malang : +- 867km
// 3. ke bumi kreasiprima warehouse : +-52km
// 4. ke pergudangan daan mogot arcadia : +-19km --> HARUSNYA INI YANG TERDEKAT
// 5. ke warehousing complex diamond :+-467km

// 1 -> 2 -> 5 -> 3 -> 4
import { Request, Response, NextFunction } from "express";
import { getProductAtCartQuery, addProductToCart } from "./CartService";

export const getProductAtCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getProductAtCartResult = await getProductAtCartQuery()
        res.status(200).send({
            error: false,
            message: 'Get Product At Cart',
            data: getProductAtCartResult
        })
    } catch (error) {
        next(error)
    }
}

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = JSON.parse(req.body.data)
        const addProductCart = await addProductToCart(data)
        res.status(200).send({
            error: false,
            message: 'Add Product to Cart Success!',
            data: null
        })

        return addProductCart
    } catch (error) {
        next(error)
    }
}


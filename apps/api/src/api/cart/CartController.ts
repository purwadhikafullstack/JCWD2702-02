import { Request, Response, NextFunction } from "express";
import { CartService } from "./CartService";

const cartService = new CartService()

export class CartController {
    async addToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: any = req.user?.uid
            const { productId, qty} = req.body

            const cartItems = await cartService.addToCart(userId, productId, qty)

            res.status(200).send({
                error: false,
                message: 'Add To Cart Success!',
                data: cartItems
            })
        } catch (error) {
            next(error)
        }
    }

    async updateCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: any = req.user?.uid
            const { productId, qty } = req.body

            const cartItem = await cartService.updateCartItem(userId, productId, qty)
            res.status(200).send({
                error: false,
                message: 'Update cart success!',
                data: cartItem
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: any = req.user?.uid
            const { productId } = req.body

            await cartService.deleteCartItem(userId, productId)

            res.status(200).send({
                error: false,
                message: 'Product removed from cart'
            })
        } catch (error) {
            next(error)
        }
    }

    async getCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: any = req.user?.uid
            const countItem = await cartService.getCartItem(userId)
            res.status(200).send({
                error: false,
                message: 'Get Cart Success!',
                data: countItem
            })
        } catch (error) {
            next(error)
        }
    }
}

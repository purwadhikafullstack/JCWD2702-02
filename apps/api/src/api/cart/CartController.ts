import { Request, Response, NextFunction } from "express";
import { addToCartQuery, getUserCartQuery } from "./CartService";
import { IReqAccessToken } from "@/helpers/Token/TokenType";


// export class CartController {
//     async addToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
//         try {
//             const userId: any = req.user?.uid
//             const { productId, qty} = req.body

//             const cartItems = await cartService.addToCart(userId, productId, qty)

//             res.status(200).send({
//                 error: false,
//                 message: 'Add To Cart Success!',
//                 data: cartItems
//             })
//         } catch (error) {
//             next(error)
//         }
//     }

//     async updateCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
//         try {
//             const userId: any = req.user?.uid
//             const { productId, qty } = req.body

//             const cartItem = await cartService.updateCartItem(userId, productId, qty)
//             res.status(200).send({
//                 error: false,
//                 message: 'Update cart success!',
//                 data: cartItem
//             })
//         } catch (error) {
//             next(error)
//         }
//     }

//     async deleteCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
//         try {
//             const userId: any = req.user?.uid
//             const { productId } = req.body

//             await cartService.deleteCartItem(userId, productId)

//             res.status(200).send({
//                 error: false,
//                 message: 'Product removed from cart'
//             })
//         } catch (error) {
//             next(error)
//         }
//     }

//     async getCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
//         try {
//             const userId: any = req.user?.uid
//             const countItem = await cartService.getCartItem(userId)
//             res.status(200).send({
//                 error: false,
//                 message: 'Get Cart Success!',
//                 data: countItem
//             })
//         } catch (error) {
//             next(error)
//         }
//     }
// }

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken;
        const { uid } = reqToken.payload;
        const { productId, qty } = req.body
        const createCart = await addToCartQuery(uid, productId, qty)
        return res.status(201).send({
            error: false,
            message: 'Add To Cart Success!',
            data: null
        })
    } catch (error) {
        next(error)
    }
}

export const getUserCart = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken = req as IReqAccessToken;
        const { uid } = reqToken.payload;
        const getUserCartResult = await getUserCartQuery(uid)
        console.log(getUserCartResult)
    } catch (error) {
        next(error)
    }
}
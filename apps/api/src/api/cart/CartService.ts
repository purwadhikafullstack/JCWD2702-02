import { prisma } from "@/lib/PrismaClient";
import { ICartItems } from "./CartTypes";
import { Cart_Items } from "@prisma/client";

// export class CartService {
//     async addToCart(userId: string, productId: number, qty: number): Promise<ICartItems | any> {
//         const user = await prisma.user.findFirst({ where: { uid: userId } })
//         if (!user || !user.verify) {
//             throw new Error('User is not registered or verified')
//         }

//         let cart = await prisma.carts.findFirst({
//             where: {
//                 userId
//             }
//         })
//         if (!cart) {
//             cart = await prisma.carts.create({
//                 data: {
//                     userId: user.uid
//                 }
//             })
//         }

//         let cartItems = await prisma.cart_Items.findUnique({
//             where: {
//                 cartId_productId: {
//                     cartId: cart.id, productId
//                 }
//             }
//         })

//         if (cartItems) {
//             cartItems = await prisma.cart_Items.update({
//                 where: {
//                     id: cartItems.id
//                 },
//                 data: {
//                     qty: cartItems.qty + qty
//                 }
//             })
//         } else {
//             cartItems = await prisma.cart_Items.create({
//                 data: {
//                     cartId: cart.id, productId, qty
//                 }
//             })
//         }
//         return cartItems
//     }

//     async updateCartItem(userId: string, productId: number, qty: number): Promise<Cart_Items | any> {
//         const cart = await prisma.carts.findFirst({
//             where: {
//                 userId
//             }
//         })
//         if (!cart) throw new Error('Cart not found')
//         const cartItem = await prisma.cart_Items.findUnique({
//             where: {
//                 cartId_productId: {
//                     cartId: cart.id, productId
//                 }
//             }
//         })
//         if (!cartItem) throw new Error('Product not found in cart')
//         return await prisma.cart_Items.update({
//             where: {
//                 id: cartItem.id
//             },
//             data: {
//                 qty
//             }
//         })
//     }

//     async deleteCartItem(userId: string, productId: number): Promise<void> {
//         const cart = await prisma.carts.findFirst({
//             where: {
//                 userId
//             }
//         })
//         if (!cart) throw new Error('Cart not found')
//         await prisma.cart_Items.deleteMany({
//             where: {
//                 cartId: cart.id, productId
//             }
//         })
//     }

//     async getCartItem(userId: string): Promise<number> {
//         const cart = await prisma.carts.findFirst({
//             where: { userId }
//         })
//         if (!cart) return 0
//         const countItem = await prisma.cart_Items.aggregate({
//             where: {
//                 cartId: cart.id
//             },
//             _sum: {
//                 qty: true
//             }
//         })
//         return countItem._sum.qty || 0
//     }
// }

export const addToCartQuery = async (userId: string, productId: number, qty: number) => {
    return await prisma.$transaction(async (tx) => {
        const findCart = await tx.carts.findFirst({
            where: {
                userId: userId,
                productId: productId
            }
        })
        if (!findCart) {
            return await tx.carts.create({
                data: {
                    userId: userId,
                    productId: productId,
                    qty: qty
                }
            })
        }
        return await tx.carts.update({
            where: {
                id: findCart?.id
            }, 
            data: {
                qty: findCart?.qty! + qty
            }
        })
    })
}

export const getUserCartQuery = async(userId: string) => {
    return await prisma.carts.findMany({
        where: {
            userId: userId
        }
    })
}

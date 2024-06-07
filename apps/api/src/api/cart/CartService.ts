import { prisma } from "@/lib/PrismaClient";
import { ICart } from "./CartTypes";

export const getProductAtCartQuery = async () => {
    return await prisma.cart_Items.findMany()
}

export const addProductToCart = async (data: ICart) => {
    return await prisma.$transaction(async (tx) => {
        await tx.cart_Items.create({
            data: {
                cartId: data.cartId,
                productId: data.productId,
                qty: data.qty
            }
        })
    })
}
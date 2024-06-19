import { User } from "@prisma/client"

export interface ICartItems {
    id?: number
    cartId: number,
    productId: number,
    qty: number
}

export interface ICart {
    cartId?: number,
    uid: string,
    items?: ICartItems[]
}

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}
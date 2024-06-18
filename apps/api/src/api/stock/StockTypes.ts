export interface IAddProductStock {
    quantity: number
    productId: number
    toId: number
}

export interface IReduceProductStock {
    quantity: number
    productId: number
    fromId: number
}

export interface IManualStockRequest {
    quantity: number
    productId: number
    fromId: number
    toId: number
}
export interface OrderItem {
    productId: number
    qty: number
}

export interface Order{
    userId: string
    address: string
    items: OrderItem[]
    paymentMethod: string
}

export interface Warehouse{
    id: number
    latitude: number
    longitude: number
    stock: Record<number, number>
}


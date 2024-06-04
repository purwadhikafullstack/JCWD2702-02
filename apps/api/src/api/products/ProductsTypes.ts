export interface IProduct {
    name: string,
    description: string,
    price: number,
    categoryId: number
}

export interface IProductImage {
    productId: number,
    productUrl: string
}
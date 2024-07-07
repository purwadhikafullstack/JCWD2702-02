export interface IProduct {
    name: string,
    description: string,
    price: number,
    categoryId: number,
    weight: number
}

export interface IProductImage {
    productId: number,
    productUrl: string
}
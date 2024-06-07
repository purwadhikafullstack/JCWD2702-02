export interface IProductCard {
    name: string;
    price: string;
    image: string;
}

export interface IProductCategoryCard {
    name: string;
    image: string;
}

export interface IDataProducts {
    id: number;
    name: string;
    price: number;
    oneImage: {
        productUrl: string;
    };
}

export interface IDataProductCategories {
    id: number;
    name: string;
    categoryUrl: string;
}
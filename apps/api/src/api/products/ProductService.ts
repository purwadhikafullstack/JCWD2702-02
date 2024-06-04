import { prisma } from './../../lib/PrismaClient';
import { IProduct } from './ProductsTypes';

// Query for get all product Categories
export const getProductCategoriesQuery = async () => {
    return await prisma.category.findMany();
};

// Query for get all products
export const getProductsQuery = async () => {
    const products = await prisma.product.findMany({
        include: {
            Categories: true
        }
    });
    const productsWithOneImage = [];
    for (const product of products) {
        const oneImage = await prisma.product_Images.findFirst({
            where: { productId: product.id },
        });

        productsWithOneImage.push({
            ...product,
            oneImage,
        });
    }

    return productsWithOneImage;
};

// Query for get product images by product id
export const getProductImagesQuery = async (id: string) => {
    return await prisma.product_Images.findMany({
        where: { productId: parseInt(id) },
    });
};

// Query for create product
export const createProductAndProductImagesQuery = async (data: IProduct, files: any) => {
    return await prisma.$transaction(async (tx) => {
        const createProductResult = await tx.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                categoryId: data.categoryId
            }
        })
        const productImages: any = [];
        files.forEach((file: any) => {
            productImages.push({
                productId: createProductResult.id,
                productUrl: file.path
            })
        })
        await tx.product_Images.createMany({
            data: [...productImages]
        })
    })
}

// Query for delete product and the product images
export const deleteProductQuery = async (id: string) => {
    return await prisma.$transaction(async (tx) => {
        await tx.product_Images.deleteMany({ where: { productId: parseInt(id) } })
        await tx.product.delete({ where: { id: parseInt(id) } })
    })
}
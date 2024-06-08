import { Prisma } from '@prisma/client';
import { prisma } from './../../lib/PrismaClient';
import { IProduct } from './ProductsTypes';

// Query for get all products
export const getProductsQuery = async (sortBy?: string, minPrice?: number, maxPrice?: number, categoryId?: number, search?: string) => {
    const sortCriteriaMap: Record<string, Prisma.ProductOrderByWithRelationInput> = {
        name: { name: 'asc' },
        newest: { createdAt: 'desc' },
        price_low_high: { price: 'asc' },
        price_high_low: { price: 'desc' },
        default: { createdAt: 'asc' },
    };

    const sortCriteria = sortBy && sortCriteriaMap[sortBy] ? sortCriteriaMap[sortBy] : sortCriteriaMap.default;
    const whereCriteria: Prisma.ProductWhereInput = {};
    if (minPrice !== undefined && maxPrice !== undefined) {
        whereCriteria.price = {
            gte: minPrice,
            lte: maxPrice,
        };
    }
    if (categoryId !== undefined) {
        whereCriteria.categoryId = categoryId;
    }
    if (search) {
        whereCriteria.name = {
            contains: search,
        };
    }

    const products = await prisma.product.findMany({
        orderBy: sortCriteria,
        where: whereCriteria,
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

// Query for get product by id
export const getProductByIdQuery = async (id: string) => {
    const products = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
            Categories: true,
            ProductImages: true
        }
    });
    const productImages = await prisma.product_Images.findMany({
        where: { productId: parseInt(id) },
    });
    return {
        products,
        productImages
    };
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

// Query for update product
export const updateProductAndProductImagesQuery = async (id: string, data: IProduct, files: any) => {
    return await prisma.$transaction(async (tx) => {
        const updateProductResult = await tx.product.update({
            where: { id: parseInt(id) },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                categoryId: data.categoryId
            }
        })
        const deleteProductImages = await tx.product_Images.deleteMany({
            where: { productId: parseInt(id) }
        })
        const productImages: any = [];
        files.forEach((file: any) => {
            productImages.push({
                productId: parseInt(id),
                productUrl: file.path
            })
        })
        await tx.product_Images.createMany({
            data: [...productImages]
        })
    })
}
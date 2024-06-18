import { Prisma } from '@prisma/client';
import { prisma } from './../../lib/PrismaClient';
import { IProduct } from './ProductsTypes';

// Query for get all products
export const getProductsQuery = async (
  sortBy?: string,
  minPrice?: number,
  maxPrice?: number,
  categoryId?: number,
  search?: string,
) => {
  const sortCriteriaMap: Record<
    string,
    Prisma.ProductOrderByWithRelationInput
  > = {
    name: { name: 'asc' },
    newest: { createdAt: 'desc' },
    price_low_high: { price: 'asc' },
    price_high_low: { price: 'desc' },
    default: { createdAt: 'asc' },
  };

    const sortCriteria = sortBy && sortCriteriaMap[sortBy] ? sortCriteriaMap[sortBy] : sortCriteriaMap.default;
    const whereCriteria: Prisma.ProductWhereInput = {
        deletedAt: null,
    };

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
        where: { ...whereCriteria },
    });
    const productsWithOneImage = [];
    for (const product of products) {
        const oneImage = await prisma.product_Images.findFirst({
            where: { productId: product.id },
        });
        productsWithOneImage.push({ ...product, oneImage, });
    }
    return productsWithOneImage;
};

// Query for get all erased products
export const getErasedProductsQuery = async () => {
    return await prisma.product.findMany({
        where: { deletedAt: { not: null } },
        include: { Categories: true, ProductImages: true }
    });
};

// Query for get product by id (total stock from all warehouse)
export const getProductByIdQuery = async (id: string) => {
    const products = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { Categories: true, stockHistory: true },
    });
    const productImages = await prisma.product_Images.findMany({
        where: { productId: parseInt(id) },
    });
    const totalStockAddedAllWarehouse = await prisma.stockHistory.aggregate({
        where: {
            AND: [{ fromId: 6 }, { productId: { equals: parseInt(id) } }]
        }, _sum: {
            quantity: true
        }
    });
    const totalStockReducedAllWarehouse = await prisma.stockHistory.aggregate({
        where: {
            AND: [{ toId: 6 || 7 }, { productId: { equals: parseInt(id) } }]
        }, _sum: {
            quantity: true
        }
    });
    const totalStockAllWarehouse = (totalStockAddedAllWarehouse._sum.quantity || 0) - (totalStockReducedAllWarehouse._sum.quantity || 0)
    return {
        products,
        productImages,
        totalStockAllWarehouse: totalStockAllWarehouse
    };
};

// Query for get product images by product id
export const getProductImagesQuery = async (id: string) => {
  return await prisma.product_Images.findMany({
    where: { productId: parseInt(id) },
  });
};

// Query for retrieving existing product image by image ID
export const getProductImageByIdQuery = async (imageId: string) => {
    return await prisma.product_Images.findUnique({
        where: { id: parseInt(imageId) },
    });
};

// Query for create product
export const createProductAndProductImagesQuery = async (
  data: IProduct,
  files: any,
) => {
  return await prisma.$transaction(async (tx) => {
    const createProductResult = await tx.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
      },
    });
    const productImages: any = [];
    files.forEach((file: any) => {
      productImages.push({
        productId: createProductResult.id,
        productUrl: file.path,
      });
    });
    await tx.product_Images.createMany({
      data: [...productImages],
    });
  });
};

// Query for delete product and the product images
export const deleteProductQuery = async (id: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.product_Images.deleteMany({ where: { productId: parseInt(id) } });
    await tx.product.delete({ where: { id: parseInt(id) } });
  });
};

// Query for soft delete product
export const softDeleteProductQuery = async (id: string) => {
    return await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
            deletedAt: new Date()
        },
    });
};

// Query for restore product
export const restoreProductQuery = async (id: string) => {
    return await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
            deletedAt: null
        },
    });
};

// Query for update product data only
export const updateProductDataQuery = async (id: string, data: IProduct) => {
    return await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
        },
    });
};

// Query for updating product image URL by image ID
export const updateProductImageQuery = async (imageId: string, imagePath: any) => {
    return await prisma.product_Images.update({
        where: { id: parseInt(imageId) },
        data: {
            productUrl: imagePath[0].path,
        },
    });
};

// Query for reset product
export const resetProductAndProductImagesQuery = async (id: string, data: IProduct, files: any) => {
    return await prisma.$transaction(async (tx) => {
        const resetProductResult = await tx.product.update({
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

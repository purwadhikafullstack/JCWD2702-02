import { Request, Response, NextFunction } from 'express';
import { DeletedProductUrlFiles } from '../../helpers/DeleteProductUrlFiles';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/PrismaClient';
import { createProductAndProductImagesQuery, getExistingProductQuery, softDeleteProductQuery, getErasedProductsQuery, restoreProductQuery, updateProductImageQuery, getProductImageByIdQuery, updateProductDataQuery, getProductsQuery, getProductByIdQuery, getProductImagesQuery, deleteProductQuery } from '../products/ProductService';

// Controller for get all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sort, minPrice, maxPrice, categoryId, search, page } = req.query;
        const minPriceNum = minPrice ? parseInt(minPrice as string) : undefined;
        const maxPriceNum = maxPrice ? parseInt(maxPrice as string) : undefined;
        const categoryIdNum = categoryId ? parseInt(categoryId as string) : undefined;
        const pageNum = page ? parseInt(page as string) : 1;
        const products = await getProductsQuery(sort as string, minPriceNum, maxPriceNum, categoryIdNum, search as string, pageNum);
        const productsCount = await prisma.product.count();
        res.status(200).send({
            count: productsCount,
            error: false,
            message: 'Get Products',
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// Controller for get all erased products
export const getErasedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const erasedProducts = await getErasedProductsQuery();
        res.status(200).send({
            count: erasedProducts.length,
            error: false,
            message: 'Get Erased Products',
            data: erasedProducts
        });
    } catch (error) {
        next(error);
    }
};

// Controller for get product and product images by id (total stock from all warehouse)
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const productResult = await getProductByIdQuery(id)
        if (!productResult) throw new Error('Cannot get product, product not found')
        res.status(200).send({
            error: false,
            message: 'Get Product',
            data: productResult
        })
    } catch (error) {
        next(error)
    }
}

// Controller for create product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = JSON.parse(req.body.data);
        let uploadedProductUrl;
        if (req.files) {
            uploadedProductUrl = Array.isArray(req.files) ? req.files : req.files['producturl'];
            const getExistingProductResult = await getExistingProductQuery();
            for (const product of getExistingProductResult) {
                if (product.name === data.name) {
                    throw new Error('Cannot Create Product, Product name already exists');
                }
            }
        }
        await createProductAndProductImagesQuery(data, uploadedProductUrl);
        res.status(201).send({
            error: false,
            message: 'Product created successfully',
            data: null,
        });
    } catch (error) {
        DeletedProductUrlFiles(req.files);
        next(error);
    }
};

// Controller for delete product and the product images
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const productImages = await getProductImagesQuery(id);
        if (productImages.length === 0)
            throw new Error('Cannot delete product, product not found');
        for (const image of productImages) {
            const imagePath = path.join(image.productUrl);
            if (fs.existsSync(imagePath)) {
                fs.rmSync(imagePath);
            } else {
                console.warn(`File does not exist: ${imagePath}`);
            }
        }
        await deleteProductQuery(id);
        res.status(200).send({
            error: false,
            message: 'Product deleted successfully',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

// Controller for soft delete product
export const softDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await softDeleteProductQuery(id)
        res.status(200).send({
            error: false,
            message: 'Product deleted successfully',
            data: null
        })
    } catch (error) {
        next(error)
    }
}

// Controller for restore product
export const restoreProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await restoreProductQuery(id)
        res.status(200).send({
            error: false,
            message: 'Product restored successfully',
            data: null
        })
    } catch (error) {
        next(error)
    }
}

// Controller for update product data only
export const updateProductData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const product = await updateProductDataQuery(id, data);
        if (!product) {
            throw new Error('Cannot update product, product not found');
        }
        res.status(200).send({
            error: false,
            message: 'Product data updated successfully',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// Controller for update product images by productImages Id
export const updateProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { imageId } = req.params;
        let uploadedProductUrl;
        if (req.files) {
            uploadedProductUrl = Array.isArray(req.files) ? req.files : req.files['producturl']
        }
        const existingImage = await getProductImageByIdQuery(imageId);
        if (!existingImage) throw new Error('Cannot update product image, image not found')
        const oldImagePath = path.join(existingImage.productUrl);
        if (fs.existsSync(oldImagePath)) {
            fs.rmSync(oldImagePath);
        } else {
            console.warn(`File does not exist: ${oldImagePath}`);
        }
        const updatedImage = await updateProductImageQuery(imageId, uploadedProductUrl);
        res.status(200).send({
            error: false,
            message: 'Product image updated successfully',
            data: existingImage,
        });
    } catch (error) {
        console.log(error);
        DeletedProductUrlFiles(req.files);
        next(error);
    }
};

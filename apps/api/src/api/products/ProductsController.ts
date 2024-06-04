import { Request, Response, NextFunction } from 'express';
import { DeletedUploadedFiles } from '../../helpers/DeleteUploadedFiles';
import fs from 'fs';
import path from 'path';
import { createProductAndProductImagesQuery, getProductsQuery, getProductCategoriesQuery, getProductImagesQuery, deleteProductQuery } from '../products/ProductService';

// Controller for get all categories
export const getProductCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getCategoriesResult = await getProductCategoriesQuery();
        res.status(200).send({
            error: false,
            meesage: 'Get Categories',
            data: getCategoriesResult
        });
    } catch (error) {
        next(error);
    }
};

// Controller for get all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getProductsResult = await getProductsQuery();
        res.status(200).send({
            count: getProductsResult.length,
            error: false,
            meesage: 'Get Products',
            data: getProductsResult
        });
    } catch (error) {
        next(error);
    }
};

// Controller for create product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = JSON.parse(req.body.data)
        if (req.files) {
            const uploadedFiles = Array.isArray(req.files) ? req.files : req.files['producturl']
            const getProductsQueryResult = await getProductsQuery()
            for (const product of getProductsQueryResult) {
                if (product.name === data.name) {
                    throw new Error('Cannot Create Product, Product name already exists')
                }
            }
            await createProductAndProductImagesQuery(data, uploadedFiles)
        }
        res.status(201).send({
            error: false,
            message: 'Product created successfully',
            data: null
        })
    } catch (error) {
        DeletedUploadedFiles(req.files)
        next(error)
    }
}

// Controller for delete product and the product images
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const productImages = await getProductImagesQuery(id);
        for (const image of productImages) {
            const imagePath = path.join(image.productUrl);
            console.log(`Attempting to delete image at path: ${imagePath}`); // Debugging log untuk attempt delete
            if (fs.existsSync(imagePath)) {
                try {
                    fs.rmSync(imagePath);
                    console.log(`Successfully deleted image: ${imagePath}`); // Debugging log untuk delete success
                } catch (err) {
                    console.error(`Error deleting file: ${imagePath}`, err); // Error log untuk delete fail
                }
            } else {
                console.warn(`File does not exist: ${imagePath}`); // Warning log kalau file not exists
            }
        }
        await deleteProductQuery(id)
        res.status(200).send({
            error: false,
            message: 'Product deleted successfully',
            data: null
        })
    } catch (error) {
        next(error)
    }
}
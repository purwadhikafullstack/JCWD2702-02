import { Request, Response, NextFunction } from 'express';
import { DeletedProductUrlFiles } from '../../helpers/DeleteProductUrlFiles';
import fs from 'fs';
import path from 'path';
import {
  createProductAndProductImagesQuery,
  updateProductAndProductImagesQuery,
  getProductsQuery,
  getProductByIdQuery,
  getProductImagesQuery,
  deleteProductQuery,
} from '../products/ProductService';

// Controller for get all products
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sort, minPrice, maxPrice, categoryId, search } = req.query;
    const minPriceNum = minPrice ? parseInt(minPrice as string) : undefined;
    const maxPriceNum = maxPrice ? parseInt(maxPrice as string) : undefined;
    const categoryIdNum = categoryId
      ? parseInt(categoryId as string)
      : undefined;

    const products = await getProductsQuery(
      sort as string,
      minPriceNum,
      maxPriceNum,
      categoryIdNum,
      search as string,
    );

    res.status(200).send({
      count: products.length,
      error: false,
      message: 'Get Products',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for get product and product images by id
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const productResult = await getProductByIdQuery(id);
    if (!productResult)
      throw new Error('Cannot get product, product not found');
    res.status(200).send({
      error: false,
      message: 'Get Product',
      data: productResult,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for create product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = JSON.parse(req.body.data);
    let uploadedProductUrl;
    if (req.files) {
      uploadedProductUrl = Array.isArray(req.files)
        ? req.files
        : req.files['producturl'];
      const getProductsQueryResult = await getProductsQuery();
      for (const product of getProductsQueryResult) {
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

// Controller for update product
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(req.body.data);
    let uploadedProductUrl;
    if (req.files) {
      uploadedProductUrl = Array.isArray(req.files)
        ? req.files
        : req.files['producturl'];
    }
    const productImages = await getProductImagesQuery(id);
    const product = await getProductByIdQuery(id);
    if (!product) throw new Error('Cannot update product, product not found');
    await updateProductAndProductImagesQuery(id, data, uploadedProductUrl);
    for (const image of productImages) {
      const imagePath = path.join(image.productUrl);
      if (fs.existsSync(imagePath)) {
        fs.rmSync(imagePath);
      } else {
        console.warn(`File does not exist: ${imagePath}`);
      }
    }
    res.status(201).send({
      error: false,
      message: 'Product updated successfully',
      data: null,
    });
  } catch (error) {
    DeletedProductUrlFiles(req.files);
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import { DeletedProductCategoryUrlFiles } from '@/helpers/DeleteProductCategoryUrlFiles';
import fs from 'fs';
import path from 'path';
import { getProductCategoriesQuery, deleteCategoryAndCategoryImagesQuery, softDeleteCategoryAndCategoryImagesQuery, createCategoryAndCategoryImagesQuery, getCategoryByIdQuery, updateCategoryAndCategoryImagesQuery } from './ProductCategoriesService';

// Controller for get all categories
export const getProductCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getCategoriesResult = await getProductCategoriesQuery();
    res.status(200).send({
      error: false,
      meesage: 'Get Categories',
      data: getCategoriesResult,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for create category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = JSON.parse(req.body.data);
    let uploadedCategoryUrl;
    if (req.files) {
      uploadedCategoryUrl = Array.isArray(req.files)
        ? req.files
        : req.files['categoryurl'];
      const getCategoriesQueryResult = await getProductCategoriesQuery();
      for (const category of getCategoriesQueryResult) {
        if (category.name === data.name) {
          throw new Error(
            'Cannot Create Category, Category name already exists',
          );
        }
      }
    }
    await createCategoryAndCategoryImagesQuery(data, uploadedCategoryUrl);
    res.status(201).send({
      error: false,
      message: 'Category created successfully',
      data: null,
    });
  } catch (error) {
    DeletedProductCategoryUrlFiles(req.files);
    next(error);
  }
};

// Controller for delete category
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const categoryResult = await getCategoryByIdQuery(id);
    if (!categoryResult) throw new Error('Cannot delete category, category not found')
    const imagePath = categoryResult?.categoryUrl;
    if (imagePath) fs.rmSync(imagePath)
    await deleteCategoryAndCategoryImagesQuery(id)
    res.status(200).send({
      error: false,
      message: 'Category deleted successfully',
      data: null
    })
  } catch (error) {
    next(error)
  }
}

// Controller for soft delete category
export const softDeleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const categoryResult = await getCategoryByIdQuery(id);
    if (!categoryResult) throw new Error('Cannot delete category, category not found')
    await softDeleteCategoryAndCategoryImagesQuery(id)
    res.status(200).send({
      error: false,
      message: 'Category deleted successfully',
      data: null
    })
  } catch (error) {
    next(error)
  }
}

// Controller for update category
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body.data ? JSON.parse(req.body.data) : {};
    let uploadedCategoryUrl = null;

    if (req.files) {
      uploadedCategoryUrl = Array.isArray(req.files) ? req.files : req.files['categoryurl'];
    }

    const getCategoryByIdResult = await getCategoryByIdQuery(id);
    const previousCategoryUrl = getCategoryByIdResult?.categoryUrl;

    if (!getCategoryByIdResult) throw new Error('Category not found');

    await updateCategoryAndCategoryImagesQuery(id, data, uploadedCategoryUrl);
    if (uploadedCategoryUrl && previousCategoryUrl) {
      fs.rmSync(previousCategoryUrl);
    }

    res.status(201).send({
      error: false,
      message: 'Category updated successfully',
      data: null
    });
  } catch (error) {
    DeletedProductCategoryUrlFiles(req.files);
    next(error);
  }
};

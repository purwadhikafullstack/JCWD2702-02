import { Router } from 'express';

import { getProductCategories, createCategory, updateCategory, deleteCategory, softDeleteCategory } from './ProductCategoriesController';

// Middleware
import { productCategoryUrlUploader } from '@/middlewares/ProductCategoryUrlUploader';

const router = Router();

router.post('/', productCategoryUrlUploader, createCategory);
router.patch('/:id', productCategoryUrlUploader, updateCategory);
router.get('/', getProductCategories);
router.delete('/:id', softDeleteCategory);

export default router;

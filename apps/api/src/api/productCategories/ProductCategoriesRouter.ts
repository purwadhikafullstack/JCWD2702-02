import { Router } from 'express';

import {
  getProductCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from './ProductCategoriesController';

// Middleware
import { productCategoryUrlUploader } from '@/middlewares/ProductCategoryUrlUploader';

const router = Router();

router.post('/', productCategoryUrlUploader, createCategory);
router.put('/:id', productCategoryUrlUploader, updateCategory);
router.get('/', getProductCategories);
router.delete('/:id', deleteCategory);

export default router;

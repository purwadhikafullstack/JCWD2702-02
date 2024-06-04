import { Router } from 'express';

import { createProduct, getProductCategories, getProducts, deleteProduct } from './ProductsController';

// Middleware
import { uploader } from '@/middlewares/Uploader';

const router = Router();

router.post('/', uploader, createProduct);
router.get('/', getProducts);
router.get('/categories', getProductCategories);
router.delete('/:id', deleteProduct);

export default router;
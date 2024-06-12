import { Router } from 'express';

import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductById,
} from './ProductsController';

// Middleware
import { productUrlUploader } from '@/middlewares/ProductUrlUploader';

const router = Router();

router.post('/', productUrlUploader, createProduct);
router.put('/:id', productUrlUploader, updateProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

export default router;

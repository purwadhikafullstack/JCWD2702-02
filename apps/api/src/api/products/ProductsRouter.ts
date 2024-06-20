import { Router } from 'express';

import { createProduct, getProducts, getErasedProducts, restoreProduct, softDeleteProduct, resetProduct, getProductById, updateProductData, updateProductImage } from './ProductsController';

// Middleware
import { productUrlUploader } from '@/middlewares/ProductUrlUploader';

const router = Router();

router.post('/', productUrlUploader, createProduct);
router.put('/:id', updateProductData);
router.put('/images/:imageId', productUrlUploader, updateProductImage);
router.put('/reset/:id', productUrlUploader, resetProduct);
router.get('/', getProducts);
router.get('/erased', getErasedProducts);
router.get('/:id', getProductById);
router.delete('/soft-delete/:id', softDeleteProduct);
router.patch('/restore/:id', restoreProduct);

export default router;

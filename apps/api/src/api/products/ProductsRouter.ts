import { Router } from 'express';

import { createProduct, getProducts, getErasedProducts, restoreProduct, softDeleteProduct, getProductById, updateProductData, updateProductImage } from './ProductsController';

// Middleware
import { productUrlUploader } from '@/middlewares/ProductUrlUploader';
import { handleErrorExpressValidator } from '@/middlewares/validator/HandleErrorExpressValidator';
import { validatorUpdateProduct } from '@/middlewares/validator/Products/ProductsDataValidator';

const router = Router();

router.post('/', handleErrorExpressValidator, productUrlUploader, createProduct);
router.put('/:id', validatorUpdateProduct, handleErrorExpressValidator, updateProductData);
router.put('/images/:imageId', productUrlUploader, updateProductImage);
router.get('/', getProducts);
router.get('/erased', getErasedProducts);
router.get('/:id', getProductById);
router.delete('/soft-delete/:id', softDeleteProduct);
router.patch('/restore/:id', handleErrorExpressValidator, restoreProduct);

export default router;

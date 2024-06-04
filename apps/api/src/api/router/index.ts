import express, { Router } from 'express';
import RolesRouter from './../roles/RolesRouter';
import ProductsRouter from './../products/ProductsRouter';

const router = Router();
router.use(express.json());

router.use('*/productImage', express.static('src/public/productImage'))

router.use('/roles', RolesRouter);
router.use('/products', ProductsRouter);

export default router;

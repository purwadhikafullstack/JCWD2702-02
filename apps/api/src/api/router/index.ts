import express, { Router } from 'express';
import RolesRouter from './../roles/RolesRouter';
import ProductsRouter from './../products/ProductsRouter';
import AuthRouter from './../auth/AuthRouter';

const router = Router();
router.use(express.json());

router.use('*/productImage', express.static('src/public/productImage'))

router.use('/roles', RolesRouter);
router.use('/products', ProductsRouter);
router.use('/auth', AuthRouter);

export default router;

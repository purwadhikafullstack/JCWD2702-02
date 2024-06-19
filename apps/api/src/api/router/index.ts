import express, { Router } from 'express';
import RolesRouter from './../roles/RolesRouter';
import ProductsRouter from './../products/ProductsRouter';
import AuthRouter from './../auth/AuthRouter';
import ProductCategoriesRouter from './../productCategories/ProductCategoriesRouter';
import CartRouter from './../cart/CartRouter'
import  OrderRouter from './../order/OrderRouter'

const router = Router();
router.use(express.json());

router.use('*/productImage', express.static('src/public/productImage'))
router.use('*/productCategoryImage', express.static('src/public/productCategoryImage'))

router.use('/roles', RolesRouter);
router.use('/products', ProductsRouter);
router.use('/categories', ProductCategoriesRouter);
router.use('/auth', AuthRouter);
router.use('/carts', CartRouter)
router.use('/order', OrderRouter)

export default router;

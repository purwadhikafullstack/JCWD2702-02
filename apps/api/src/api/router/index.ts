import express, { Router } from 'express';
import RolesRouter from './../roles/RolesRouter';
import ProductsRouter from './../products/ProductsRouter';
import AuthRouter from './../auth/AuthRouter';
import ProductCategoriesRouter from './../productCategories/ProductCategoriesRouter';
import RajaOngkirRouter from './../rajaOngkir/RajaOngkirRouter';
import WarehouseRouter from './../warehouses/WarehouseRouter';
import StockRouter from './../stock/StockRouter';

const router = Router();
router.use(express.json());

router.use('*/productImage', express.static('src/public/productImage'));
router.use(
  '*/productCategoryImage',
  express.static('src/public/productCategoryImage'),
);
router.use('*/userImage', express.static('src/public/userImage'));

router.use('/roles', RolesRouter);
router.use('/products', ProductsRouter);
router.use('/categories', ProductCategoriesRouter);
router.use('/auth', AuthRouter);
router.use('/raja-ongkir', RajaOngkirRouter);
router.use('/warehouse', WarehouseRouter);
router.use('/stock', StockRouter);

export default router;

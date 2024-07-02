import { Router } from 'express';

import { getRecentOrders, getRecentOrdersPerWarehouse, getOrdersPerMonth, getOrdersPerMonthPerWarehouse, getExistingProducts, getExistingCategories, getRevenues, getRevenuesPerWarehouse } from './ReportController';

const router = Router();

router.get('/period-revenues', getRevenues);
router.get('/period-revenues/:warehouseId', getRevenuesPerWarehouse);
router.get('/existing-products', getExistingProducts);
router.get('/existing-categories', getExistingCategories);
router.get('/orders/month', getOrdersPerMonth);
router.get('/orders/month/:warehouseId', getOrdersPerMonthPerWarehouse);
router.get('/recent-orders', getRecentOrders);
router.get('/recent-orders/:warehouseId', getRecentOrdersPerWarehouse);

export default router
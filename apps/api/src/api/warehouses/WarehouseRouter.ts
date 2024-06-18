import { Router } from 'express';

import { getWarehouses, getWarehouseById, getProductsPerWarehouse, getStockRequestByWarehouseId, getStockHistoryByProductIdAndWarehouseId, getStockMutationType } from './WarehouseController';

const router = Router();

router.get('/products', getProductsPerWarehouse)
router.get('/', getWarehouses);
router.get('/:warehouseId/stock-requests', getStockRequestByWarehouseId);
router.get('/:warehouseId/products/:productId', getStockHistoryByProductIdAndWarehouseId);
router.get('/mutation-types-lists/:warehouseId', getStockMutationType);
router.get('/:id', getWarehouseById);

export default router;
import { Router } from 'express';
import { warehouseAdminVerify } from '@/middlewares/RoleVerify';

import {
  getWarehouses,
  getWarehouseById,
  getProductsPerWarehouse,
  getOutgoingStockRequestByWarehouseId,
  getStockRequestByWarehouseId,
  getStockHistoryByProductIdAndWarehouseId,
  getStockMutationType,
} from './WarehouseController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.get('/products/:warehouseId', getProductsPerWarehouse);
router.get('/', getWarehouses);
router.get('/:warehouseId/stock-requests', getStockRequestByWarehouseId);
router.get(
  '/:warehouseId/outgoing-stock-requests',
  getOutgoingStockRequestByWarehouseId,
);
router.get(
  '/:warehouseId/products/:productId',
  getStockHistoryByProductIdAndWarehouseId,
);
router.get('/mutation-types-lists/:warehouseId', getStockMutationType);
router.get('/:id', tokenVerify, warehouseAdminVerify, getWarehouseById);

export default router;

import { Router } from 'express';

import { addProductStock, getStockHistory, getAllStockRequest, reduceProductStock, manualStockRequest, acceptStockRequest, rejectStockRequest, automaticStockRequest } from './StockController';

const router = Router();

router.get('/', getStockHistory);
router.get('/stock-request', getAllStockRequest);
router.post('/add-stock', addProductStock);
router.post('/reduce-stock', reduceProductStock);
router.post('/manual-stock-request', manualStockRequest);
router.post('/auto-stock-request', automaticStockRequest);
router.put('/reject-stock-request/:id', rejectStockRequest);
router.put('/accept-stock-request/:id', acceptStockRequest);

export default router;
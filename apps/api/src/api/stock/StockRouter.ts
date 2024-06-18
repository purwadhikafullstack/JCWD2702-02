import { Router } from 'express';

import { addProductStock, getStockHistory, reduceProductStock, manualStockRequest } from './StockController';

const router = Router();

router.get('/', getStockHistory);
router.post('/add-Stock', addProductStock);
router.post('/reduce-Stock', reduceProductStock);
router.post('/manual-Stock-Request', manualStockRequest);

export default router;
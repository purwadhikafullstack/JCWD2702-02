import { Router } from 'express';
import { getProductAtCart, addToCart } from './CartController';

const router = Router();

router.get('/', getProductAtCart)
router.post('/carts', addToCart)

export default router;

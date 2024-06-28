import { Router } from 'express';
import {
  addToCart,
  getUserCart,
  getCartDetail,
  addToCartDetail,
} from './CartController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

// router.get('/count', cartController.getCartItem.bind(cartController))
router.post('/', tokenVerify, addToCart);
router.get('/', tokenVerify, getUserCart);
router.get('/detail', tokenVerify, getCartDetail);
router.post('/detail', tokenVerify, addToCartDetail);
// router.delete('/', cartController.deleteCartItem.bind(cartController))
// router.put('/', cartController.updateCartItem.bind(cartController))

export default router;

import { Router } from 'express';
import {
  addToCart,
  getUserCart,
  getCartDetail,
  addToCartDetail,
  deleteCart,
  setSelectedCart,
  selectAll,
} from './CartController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

// router.get('/count', cartController.getCartItem.bind(cartController))
router.post('/', tokenVerify, addToCart);
router.get('/', tokenVerify, getUserCart);
router.get('/detail', tokenVerify, getCartDetail);
router.post('/detail', tokenVerify, addToCartDetail);
router.delete('/', tokenVerify, deleteCart);
router.post('/selected', tokenVerify, setSelectedCart);
router.post('/selected-all', tokenVerify, selectAll);
// router.delete('/', cartController.deleteCartItem.bind(cartController))
// router.put('/', cartController.updateCartItem.bind(cartController))

export default router;

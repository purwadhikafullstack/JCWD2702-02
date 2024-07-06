import { Router } from 'express';
import {
  OrderController,
  checkoutMidtrans,
  getUserOrder,
  midtransNotif,
  test,
} from './OrderController';
import { tokenVerify } from '@/helpers/Token';

const orderController = new OrderController();
const router = Router();

router.post('/orders', orderController.createOrder.bind(orderController));
router.post('/checkout-midtrans', tokenVerify, checkoutMidtrans);
router.get('/user', tokenVerify, getUserOrder);
router.post('/notification', midtransNotif);
router.post('/test', test);

export default router;

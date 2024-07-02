import { Router } from 'express';
import {
  getProvince,
  getCities,
  getCityDetail,
  shippingCost,
} from './RajaOngkirController';

const router = Router();

router.get('/province', getProvince);
router.get('/cities', getCities);
router.get('/detail-city', getCityDetail);
router.post('/shipping-cost', shippingCost);

export default router;

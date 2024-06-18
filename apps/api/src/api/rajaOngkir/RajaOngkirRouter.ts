import { Router } from 'express';
import { getProvince, getCities, getCityDetail } from './RajaOngkirController';

const router = Router();

router.get('/province', getProvince);
router.get('/cities', getCities);
router.get('/detail-city', getCityDetail);

export default router;

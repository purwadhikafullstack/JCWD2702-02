import express, { Router } from 'express';
import RolesRouter from './../roles/RolesRouter';
import CartRouter from './../cart/CartRouter'

const router = Router();
router.use(express.json());

router.use('/roles', RolesRouter);
router.use('/cart', CartRouter)

export default router;

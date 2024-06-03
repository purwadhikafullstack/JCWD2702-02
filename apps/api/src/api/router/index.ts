import express, { Router } from 'express';
import AuthRouter from './../auth/AuthRouter';

const router = Router();
router.use(express.json());

router.use('/auth', AuthRouter);

export default router;

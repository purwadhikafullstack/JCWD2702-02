import express, { Router } from 'express';
import RolesRouter from './../roles/RolesRouter';
import LoginRouter from '../auth/login/LoginRouter';
import RegisterRouter from '../auth/register/RegisterRouter';

const router = Router();
router.use(express.json());

router.use('/roles', RolesRouter);
router.use('/login', LoginRouter);
router.use('/register', RegisterRouter);

export default router;

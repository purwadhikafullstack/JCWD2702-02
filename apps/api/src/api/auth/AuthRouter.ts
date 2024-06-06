import { getUserById, resetPassword } from './cores/AuthController';
import express, { Router } from 'express';
import RolesRouter from './../roles/RolesRouter';
import LoginRouter from '../auth/login/LoginRouter';
import RegisterRouter from '../auth/register/RegisterRouter';
import OauthRouter from './../auth/oauth/OauthRouter';
import { tokenVerify } from '@/helpers/Token';

const router = Router();
router.use(express.json());

router.use('/roles', RolesRouter);
router.use('/login', LoginRouter);
router.use('/register', RegisterRouter);
router.use('/oauth', OauthRouter);
router.get('/user', tokenVerify, getUserById);
router.post('/reset-password', tokenVerify, resetPassword);

export default router;

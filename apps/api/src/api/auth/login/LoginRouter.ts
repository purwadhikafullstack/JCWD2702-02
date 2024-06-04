import { Router } from 'express';
import { userLoginByEmail, keepLogin } from './LoginController';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.post('/', userLoginByEmail);
router.post('/keep-login', tokenVerify, keepLogin);

export default router;

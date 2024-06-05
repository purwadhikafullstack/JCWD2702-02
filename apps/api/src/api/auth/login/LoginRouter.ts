import { Router } from 'express';
import { userLoginByEmail, keepLogin, loginWithOuath } from './LoginController';
import { tokenVerify, KeepLoginTokenVerify } from '@/helpers/Token';

const router = Router();

router.post('/', userLoginByEmail);
router.post('/keep-login', KeepLoginTokenVerify, keepLogin);
router.post('/oauth', tokenVerify, loginWithOuath);

export default router;

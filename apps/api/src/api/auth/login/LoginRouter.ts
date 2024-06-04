import { Router } from 'express';
import { userLoginByEmail } from './LoginController';

const router = Router();

router.post('/', userLoginByEmail);

export default router;

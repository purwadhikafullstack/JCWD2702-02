import { Router } from 'express';
import { login } from './LoginController';

const router = Router();

router.post('/', login);

export default router;

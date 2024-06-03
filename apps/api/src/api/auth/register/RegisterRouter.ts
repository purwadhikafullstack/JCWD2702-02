import { Router } from 'express';
import { userRegister } from './RegisterController';
import { userRegisterValidator } from './../../../middleware/validator/userRegisterValidator';

const router = Router();

router.post('/', userRegisterValidator, userRegister);

export default router;

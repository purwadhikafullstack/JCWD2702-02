import { Router } from 'express';
import {
  userRegisterByEmail,
  userVerificationByEmail,
} from './RegisterController';
import { userRegisterValidator } from '../../../middlewares/validator/UserRegister/userRegisterValidator';
import { handleErrorExpressValidator } from './../../../middlewares/validator/HandleErrorExpressValidator';
import { tokenVerify } from '@/helpers/Token';

const router = Router();

router.post(
  '/',
  userRegisterValidator,
  handleErrorExpressValidator,
  userRegisterByEmail,
);
router.post('/verification', tokenVerify, userVerificationByEmail);

export default router;

import { Router } from 'express';
import { userRegister } from './RegisterController';
import { userRegisterValidator } from '../../../middlewares/validator/UserRegister/userRegisterValidator';
import { handleErrorExpressValidator } from './../../../middlewares/validator/HandleErrorExpressValidator';

const router = Router();

router.post(
  '/',
  userRegisterValidator,
  handleErrorExpressValidator,
  userRegister,
);

export default router;

import { Router } from 'express';
import { tokenVerify } from '@/helpers/Token';
import { userImageUrlUploader } from '@/middlewares/UserImageUrlUploader';
import { userImageUpload, userAddress } from './UserController';

const router = Router();

router.post(
  '/image-uploader',
  tokenVerify,
  userImageUrlUploader,
  userImageUpload,
);
router.post('/user-address', tokenVerify, userAddress);

export default router;

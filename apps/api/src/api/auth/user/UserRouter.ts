import { Router } from 'express';
import { tokenVerify } from '@/helpers/Token';
import { userImageUrlUploader } from '@/middlewares/UserImageUrlUploader';
import {
  userImageUpload,
  createUserAddress,
  findUserAddress,
  mainUserAddress,
  findUserAddressDetail,
  deleteUserAddress,
  getAddressDetail,
  updateUserAddress,
} from './UserController';

const router = Router();

router.post(
  '/image-uploader',
  tokenVerify,
  userImageUrlUploader,
  userImageUpload,
);
router.post('/user-address', tokenVerify, createUserAddress);
router.get('/address', tokenVerify, findUserAddress);
router.post('/main-address', tokenVerify, mainUserAddress);
router.get('/address-detail', tokenVerify, findUserAddressDetail);
router.post('/delete-address', tokenVerify, deleteUserAddress);
router.get('/detail-address', tokenVerify, getAddressDetail);
router.post('/update-address', tokenVerify, updateUserAddress);

export default router;

import { Router } from 'express';
import {
  adminLogin,
  getWarehouseAdmin,
  getWarehouseAdminDetail,
  getWarehouse,
  assignWarehouseAdmin,
  getAllUser,
  getUserDetail,
  createUser,
  updateUserData,
} from './AdminController';
import { tokenVerify } from '@/helpers/Token';
import { roleVerifySuperAdmin } from '@/middlewares/RoleVerify';

const router = Router();

router.post('/login', adminLogin);
router.get(
  '/warehouse-admin',
  tokenVerify,
  roleVerifySuperAdmin,
  getWarehouseAdmin,
);
router.get(
  '/warehouse-admin-detail',
  tokenVerify,
  roleVerifySuperAdmin,
  getWarehouseAdminDetail,
);
router.get('/warehouse', tokenVerify, roleVerifySuperAdmin, getWarehouse);
router.post(
  '/assign-admin',
  tokenVerify,
  roleVerifySuperAdmin,
  assignWarehouseAdmin,
);
router.get('/all-user', tokenVerify, roleVerifySuperAdmin, getAllUser);
router.get('/user-detail', tokenVerify, roleVerifySuperAdmin, getUserDetail);
router.post('/user', tokenVerify, roleVerifySuperAdmin, createUser);
router.post('/update-user', tokenVerify, roleVerifySuperAdmin, updateUserData);

export default router;

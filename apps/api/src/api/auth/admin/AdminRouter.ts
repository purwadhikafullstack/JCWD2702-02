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
  createWarehouse,
  getWarehouseDetail,
  updateWarehouseDetail,
  createAdmin,
  deleteAdmin,
  deleteUser,
} from './AdminController';
import {
  deleteAdminValidator,
  deleteUserValidator,
} from './../../../middlewares/validator/Admin';
import { handleErrorExpressValidator } from './../../../middlewares/validator/HandleErrorExpressValidator';
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
router.post('/warehouse', tokenVerify, roleVerifySuperAdmin, createWarehouse);
router.get(
  '/warehouse-detail',
  tokenVerify,
  roleVerifySuperAdmin,
  getWarehouseDetail,
);
router.post(
  '/warehouse-detail',
  tokenVerify,
  roleVerifySuperAdmin,
  updateWarehouseDetail,
);
router.post('/warehouse-admin', tokenVerify, roleVerifySuperAdmin, createAdmin);
router.post(
  '/erase-admin',
  tokenVerify,
  roleVerifySuperAdmin,
  deleteAdminValidator,
  handleErrorExpressValidator,
  deleteAdmin,
);
router.post(
  '/erase-user',
  tokenVerify,
  roleVerifySuperAdmin,
  deleteUserValidator,
  handleErrorExpressValidator,
  deleteUser,
);

export default router;

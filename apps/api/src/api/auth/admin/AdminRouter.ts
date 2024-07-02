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
  AdminLoginValidator,
  getWarehouseAdminDetailValidator,
  assignWarehouseAdminValidator,
  getUserDetailValidator,
  createUserValidator,
  updateUserDataValidator,
  createWarehouseValidator,
  getWarehouseDetailValidator,
  updateWarehouseValidator,
  createAdminValidator,
} from './../../../middlewares/validator/Admin';
import { handleErrorExpressValidator } from './../../../middlewares/validator/HandleErrorExpressValidator';
import { tokenVerify } from '@/helpers/Token';
import { roleVerifySuperAdmin } from '@/middlewares/RoleVerify';

const router = Router();

router.post(
  '/login',
  AdminLoginValidator,
  handleErrorExpressValidator,
  adminLogin,
);
router.get(
  '/warehouse-admin',
  tokenVerify,
  roleVerifySuperAdmin,
  getWarehouseAdmin,
);
router.get(
  '/warehouse-admin-detail',
  tokenVerify,
  getWarehouseAdminDetailValidator,
  handleErrorExpressValidator,
  roleVerifySuperAdmin,
  getWarehouseAdminDetail,
);
router.get('/warehouse', tokenVerify, roleVerifySuperAdmin, getWarehouse);
router.post(
  '/assign-admin',
  tokenVerify,
  assignWarehouseAdminValidator,
  handleErrorExpressValidator,
  roleVerifySuperAdmin,
  assignWarehouseAdmin,
);
router.get('/all-user', tokenVerify, roleVerifySuperAdmin, getAllUser);
router.get(
  '/user-detail',
  tokenVerify,
  roleVerifySuperAdmin,
  getUserDetailValidator,
  handleErrorExpressValidator,
  getUserDetail,
);
router.post(
  '/user',
  tokenVerify,
  roleVerifySuperAdmin,
  createUserValidator,
  handleErrorExpressValidator,
  createUser,
);
router.post(
  '/update-user',
  tokenVerify,
  roleVerifySuperAdmin,
  updateUserDataValidator,
  handleErrorExpressValidator,
  updateUserData,
);
router.post(
  '/warehouse',
  tokenVerify,
  roleVerifySuperAdmin,
  createWarehouseValidator,
  handleErrorExpressValidator,
  createWarehouse,
);
router.get(
  '/warehouse-detail',
  tokenVerify,
  roleVerifySuperAdmin,
  getWarehouseDetailValidator,
  handleErrorExpressValidator,
  getWarehouseDetail,
);
router.post(
  '/warehouse-detail',
  tokenVerify,
  roleVerifySuperAdmin,
  updateWarehouseValidator,
  handleErrorExpressValidator,
  updateWarehouseDetail,
);
router.post(
  '/warehouse-admin',
  tokenVerify,
  roleVerifySuperAdmin,
  createAdminValidator,
  handleErrorExpressValidator,
  createAdmin,
);
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

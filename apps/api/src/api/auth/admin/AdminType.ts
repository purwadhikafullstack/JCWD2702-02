import { UserVerify } from '@prisma/client';

export interface IReqAssignWarehouseAdminService {
  uid: string;
  name: string;
  email: string;
  warehouseId: number;
}

export interface IReqCreateUserService {
  fullname: string;
  email: string;
  password: string;
}

export interface IReqUpdateUserService {
  uid: string;
  fullname: string;
  email: string;
  verify: UserVerify;
}

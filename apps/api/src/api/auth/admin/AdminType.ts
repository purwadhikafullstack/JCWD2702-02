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

export interface IReqCreateWarehouseService {
  id?: number;
  name: string;
  province: string;
  provinceId: string;
  city: string;
  cityId: string;
  detail: string;
  postalCode: string;
  longitude: string;
  latitude: string;
}

export interface IReqCreateAdminService {
  fullname: string;
  email: string;
  password: string;
}

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

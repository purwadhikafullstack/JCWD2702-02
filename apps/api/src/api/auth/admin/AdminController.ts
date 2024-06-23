import { createToken } from './../../../helpers/Token/index';
import { Request, Response, NextFunction } from 'express';
import { ComparePassword } from '@/helpers/HashingPassword';
import {
  findAdminByEmailService,
  getWarehouseAdminService,
  getWarehouseAdminDetailService,
  getWarehouseService,
  assignWarehouseAdminService,
} from './AdminService';

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const findAdminByEmailResult = await findAdminByEmailService(email);
    if (!findAdminByEmailResult) throw new Error('User Not Found');

    const comparePassword = await ComparePassword({
      passwordFromClient: password,
      passwordFromDatabase: findAdminByEmailResult.password,
    });
    if (!comparePassword) throw new Error("Password Doesn't Match");

    const accesstoken = await createToken({ uid: findAdminByEmailResult.uid });

    return res.status(201).send({
      error: false,
      message: 'Login Success',
      data: {
        accesstoken: accesstoken,
        role: findAdminByEmailResult.adminRole,
        name: findAdminByEmailResult.fullname,
        email: findAdminByEmailResult.email,
        warehouse: findAdminByEmailResult.warehouseId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getWarehouseAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const getWarehouseAdminResult = await getWarehouseAdminService();

  res.status(201).send({
    error: false,
    message: 'Get Warehouse Admin',
    data: getWarehouseAdminResult,
  });

  try {
  } catch (error) {
    next(error);
  }
};

export const getWarehouseAdminDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { adminId } = req.query;

    const getWarehouseAdminDetailResult = await getWarehouseAdminDetailService({
      uid: adminId as string,
    });

    res.status(201).send({
      error: false,
      message: 'Get Warehouse Admin Detail',
      data: getWarehouseAdminDetailResult,
    });
  } catch (error) {
    next(error);
  }
};

export const getWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getWarehouseResult = await getWarehouseService();

    res.status(201).send({
      error: false,
      message: 'Get Warehouse',
      data: getWarehouseResult,
    });
  } catch (error) {
    next(error);
  }
};

export const assignWarehouseAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { uid, name, email, warehouseId } = req.body;

    await assignWarehouseAdminService({ uid, name, email, warehouseId });

    return res.status(201).send({
      error: false,
      message: 'Update Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

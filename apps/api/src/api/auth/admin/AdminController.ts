import { createToken } from './../../../helpers/Token/index';
import { Request, Response, NextFunction } from 'express';
import { ComparePassword } from '@/helpers/HashingPassword';
import {
  findAdminByEmailService,
  getWarehouseAdminService,
  getWarehouseAdminDetailService,
  getWarehouseService,
  assignWarehouseAdminService,
  getAllUserService,
  getUserDetailService,
  createUserService,
  updateUserService,
} from './AdminService';
import { HashingPassword } from '@/helpers/HashingPassword';
import { findUserByEmailService } from '../cores/AuthService';

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

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { getAllUserResult } = await getAllUserService();

    res.status(201).send({
      error: false,
      message: 'Get All User',
      data: getAllUserResult,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.query;

    const getUserDetailResult = await getUserDetailService({
      uid: userId as string,
    });

    res.status(201).send({
      error: false,
      message: 'Get User Detail',
      data: getUserDetailResult,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullname, email, password } = req.body;

    const findUserByEmailResult = await findUserByEmailService({ email });

    if (findUserByEmailResult) throw new Error('Email has been used');

    const HashedPassword = await HashingPassword({ password: password });

    await createUserService({ fullname, email, password: HashedPassword });

    res.status(201).send({
      error: false,
      message: 'Create User Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.query;
    const { fullname, email, verify } = req.body;

    await updateUserService({ uid: userId as string, fullname, email, verify });

    return res.status(201).send({
      error: false,
      message: 'Update Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

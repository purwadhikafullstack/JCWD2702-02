import { Request, Response, NextFunction } from 'express';
import { userLoginByEmailService } from './LoginService';
import { ComparePassword } from '@/helpers/HashingPassword';
import { createToken } from '@/helpers/Token';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import {
  findUserByIdService,
  findAdminByUidService,
} from '../cores/AuthService';

export const userLoginByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const findUserByEmailResult = await userLoginByEmailService({ email });

    if (!findUserByEmailResult) {
      throw new Error('User Not Found Please Register First!');
    }

    if (findUserByEmailResult.verify == 'UNVERIFY') {
      throw new Error('Please Verify Your Account First');
    }

    if (findUserByEmailResult.google == 'TRUE') {
      throw new Error('Please Login By Google');
    }

    const passwordValidation = await ComparePassword({
      passwordFromClient: password,
      passwordFromDatabase: findUserByEmailResult.password!,
    });

    if (!passwordValidation) {
      throw new Error('Wrong Password Please Input Valid Password');
    }

    const accesstoken = await createToken({ uid: findUserByEmailResult.uid });

    res.status(200).send({
      error: false,
      message: 'Login Success',
      data: {
        accesstoken: accesstoken,
        role: findUserByEmailResult.roleId,
        email: findUserByEmailResult.email,
        name: findUserByEmailResult.fullname,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const keepLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const findUserByIdResult = await findUserByIdService({ uid });
    const findAdminByIdResult = await findAdminByUidService(uid);

    console.log(findAdminByIdResult);
    console.log(findUserByIdResult);

    if (!findUserByIdResult) {
      const accesstoken = createToken({ uid: findAdminByIdResult?.uid! });

      return res.status(201).send({
        error: false,
        message: 'Keep Login Admin',
        data: {
          accesstoken: accesstoken,
          role: findAdminByIdResult?.adminRole,
          email: findAdminByIdResult?.email,
          name: findAdminByIdResult?.fullname,
          warehouse: findAdminByIdResult?.warehouseId,
        },
      });
    } else if (!findAdminByIdResult) {
      const accesstoken = await createToken({ uid });
      return res.status(201).send({
        error: false,
        message: 'Keep Login User',
        data: {
          accesstoken: accesstoken,
          role: findUserByIdResult?.roleId,
          email: findUserByIdResult?.email,
          name: findUserByIdResult?.fullname,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const loginWithOuath = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const loginWithOauthResult = await findUserByIdService({ uid });

    const accesstoken = await createToken({ uid: loginWithOauthResult?.uid! });

    res.status(201).send({
      error: false,
      message: 'Login With Google Success',
      data: {
        accesstoken: accesstoken,
        role: loginWithOauthResult?.roleId,
        email: loginWithOauthResult?.email,
        name: loginWithOauthResult?.fullname,
      },
    });
  } catch (error) {
    next(error);
  }
};

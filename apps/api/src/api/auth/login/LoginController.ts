import { Request, Response, NextFunction } from 'express';
import { userLoginByEmailService } from './LoginService';
import { ComparePassword } from '@/helpers/HashingPassword';
import { createToken } from '@/helpers/Token';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import { findUserByIdService } from '../cores/AuthService';

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

    console.log(uid);

    const findUserByIdResult = await findUserByIdService({ uid });

    const accesstoken = await createToken({ uid });

    res.status(201).send({
      error: false,
      message: 'Keep Login',
      data: {
        accesstoken: accesstoken,
        role: findUserByIdResult?.roleId,
        email: findUserByIdResult?.email,
        name: findUserByIdResult?.fullname,
      },
    });
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

import { Request, Response, NextFunction } from 'express';
import { userLoginByEmailService } from './LoginService';
import { ComparePassword } from '@/helpers/HashingPassword';
import { createToken } from '@/helpers/Token';

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

    const passwordValidation = await ComparePassword({
      passwordFromClient: password,
      passwordFromDatabase: findUserByEmailResult.password,
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
      },
    });
  } catch (error) {
    next(error);
  }
};

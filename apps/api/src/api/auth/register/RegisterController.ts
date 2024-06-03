import { Request, Response, NextFunction } from 'express';
import { HashingPassword } from '@/helpers/HashingPassword';
import { userRegisterService, findUserByEmail } from './RegisterService';
import { createToken } from '@/helpers/Token';

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) throw new Error("Password doesn't match");

    const emailValidation = await findUserByEmail({ email });

    if (emailValidation) throw new Error('Email has been used');

    const hashedPassword = await HashingPassword({ password });

    const userRegisterResult = await userRegisterService({
      fullname,
      email,
      password: hashedPassword,
    });

    const accesstoken = await createToken({ uid: userRegisterResult.uid });

    res.status(201).send({
      error: false,
      message: 'Register Success',
      data: {
        accesstoken: accesstoken,
      },
    });
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import { HashingPassword } from '@/helpers/HashingPassword';
import {
  userRegisterByEmailService,
  findUserByEmail,
  userVerificationByEmailService,
} from './RegisterService';
import { findUserByIdService } from '../cores/AuthService';
import {
  createUserRegisterToken,
  createVerificationToken,
} from '@/helpers/Token';
import { transporterNodemailer } from '../../../helpers/Mailer/TransporterMailer';
import Handlebars from 'handlebars';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import { sendMail } from '@/helpers/Mailer/Mailer';
import fs from 'fs';

export const userRegisterByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullname, email } = req.body;

    const emailValidation = await findUserByEmail({ email });

    if (emailValidation) throw new Error('Email has been used');

    const registerUserByEmailResult = await userRegisterByEmailService({
      fullname,
      email,
    });

    const accesstoken = await createVerificationToken({
      uid: registerUserByEmailResult.uid,
    });

    await sendMail({
      accesstoken: accesstoken,
      email: email,
      username: email,
      link: 'verification',
      subject: 'Verify Your Email',
    });

    res.status(200).send({
      error: false,
      message: 'Register Success, Please Check Your Email For Verification',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const userVerificationByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) throw new Error("Password Doesn't Match");

    const emailValidator = await findUserByIdService({ uid });

    if (emailValidator?.verify == 'VERIFIED')
      throw new Error('Account Already Verified');

    const hashedPassword = await HashingPassword({ password });

    await userVerificationByEmailService({
      uid,
      password: hashedPassword,
    });

    res.status(201).send({
      error: false,
      message: 'Verify Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

import {
  findUserByIdService,
  createUserPasswordInfoService,
  findUserResetPasswordInfoService,
} from './AuthService';
import { Request, Response, NextFunction } from 'express';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import {
  createUserRegisterToken,
  createVerificationToken,
} from '@/helpers/Token';
import { transporterNodemailer } from '@/helpers/Mailer/TransporterMailer';
import {
  defaultExpireTime,
  currentTime,
} from '@/helpers/ExpireDate/DefaultExpireDate';
import Handlebars from 'handlebars';
import fs from 'fs';

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    // console.log(uid);
    const findUserByIdResult = await findUserByIdService({ uid });

    res.status(201).send({
      error: false,
      message: 'Get User',
      data: findUserByIdResult,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const currTime = await currentTime();
    const expireInOneHour = await defaultExpireTime(1);

    const findUserResult = await findUserByIdService({ uid });
    const findUserResetPasswordInfoResult =
      await findUserResetPasswordInfoService({ uid: findUserResult?.uid! });

    if (currTime <= findUserResetPasswordInfoResult?.expireIn.toISOString()!) {
      throw new Error(
        'We Already Sent The Link To Your Email Expire In 1 Hour',
      );
    }

    await createUserPasswordInfoService({
      uid: findUserResult?.uid!,
      date: expireInOneHour,
    });

    const accesstoken = await createVerificationToken({
      uid: findUserResult?.uid!,
    });

    const verificationHTML = fs.readFileSync(
      'src/template/EmailVerification.html',
      'utf-8',
    );

    let verificationHTMLCompiler: any =
      await Handlebars.compile(verificationHTML);

    verificationHTMLCompiler = verificationHTMLCompiler({
      username: findUserResult?.email,
      link: `http://localhost:3000/auth/verification/${accesstoken}`,
    });

    transporterNodemailer.sendMail({
      from: 'Warehouse E-Commerce',
      to: findUserResult?.email,
      subject: 'Reset Password',
      html: verificationHTMLCompiler,
    });

    res.status(201).send({
      error: false,
      message: 'Check Your Email For Reset Password Link',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

import {
  findUserByIdService,
  createUserPasswordInfoService,
  findUserResetPasswordInfoService,
  updatePasswordService,
  findUserEmailVerificationInfoService,
  createUserEmailVerificationInfoService,
  updateUserEmailService,
  findUserByEmailService,
  findResetPasswordHistoryService,
  expiredUserResetPasswordInfo,
} from './AuthService';
import { Request, Response, NextFunction } from 'express';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import {
  createUserRegisterToken,
  createVerificationToken,
} from '@/helpers/Token';
import {
  defaultExpireTime,
  currentTime,
} from '@/helpers/ExpireDate/DefaultExpireDate';
import { sendMail } from '@/helpers/Mailer/Mailer';
import { HashingPassword } from '@/helpers/HashingPassword';

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

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

export const resetPasswordRequest = async (
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

    if (
      findUserResetPasswordInfoResult?.status !== 'DONE' &&
      currTime <= findUserResetPasswordInfoResult?.expireIn.toISOString()!
    ) {
      throw new Error(
        'We Already Sent The Link To Your Email Expire In 1 Hour',
      );
    }

    if (
      findUserResetPasswordInfoResult &&
      findUserResetPasswordInfoResult.status !== 'DONE'
    ) {
      await expiredUserResetPasswordInfo({
        uid: findUserResetPasswordInfoResult?.userId!,
        id: findUserResetPasswordInfoResult?.id!,
      });
    }

    await createUserPasswordInfoService({
      uid: findUserResult?.uid!,
      date: expireInOneHour,
    });

    const accesstoken = await createVerificationToken({
      uid: findUserResult?.uid!,
    });

    await sendMail({
      accesstoken: accesstoken,
      username: findUserResult?.email!,
      email: findUserResult?.email!,
      link: 'reset-password',
      subject: 'Reset Password',
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

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { password, confirmPassword } = req.body;

    const currTime = await currentTime();

    if (password !== confirmPassword) throw new Error("Password Doesn't Match");

    const findResetHistoryResult = await findResetPasswordHistoryService({
      uid,
    });

    if (
      findResetHistoryResult?.status == 'DONE' ||
      currTime >= findResetHistoryResult?.expireIn.toISOString()!
    ) {
      await expiredUserResetPasswordInfo({
        uid: findResetHistoryResult?.userId!,
        id: findResetHistoryResult?.id!,
      });
      throw new Error('Please Request New Link');
    }

    const hashedPassword = await HashingPassword({ password });

    await updatePasswordService({
      uid,
      password: hashedPassword,
    });

    res.status(201).send({
      error: false,
      message: 'Update Password Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmailRequest = async (
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
    const findUserEmailVerificationInfoResult =
      await findUserEmailVerificationInfoService({ uid: findUserResult?.uid! });

    if (
      currTime <= findUserEmailVerificationInfoResult?.expireIn.toISOString()!
    ) {
      throw new Error(
        'We Already Sent The Link To Your Email Expire In 1 Hour',
      );
    }

    await createUserEmailVerificationInfoService({
      uid: findUserResult?.uid!,
      date: expireInOneHour,
    });

    const accesstoken = await createVerificationToken({
      uid: findUserResult?.uid!,
    });

    await sendMail({
      accesstoken: accesstoken,
      username: findUserResult?.email!,
      email: findUserResult?.email!,
      link: 'update-email',
      subject: 'Update Email',
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

export const updateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { email, confirmEmail } = req.body;

    if (email != confirmEmail) throw new Error("Email Doesn't Match");

    const findUserByIdResult = await findUserByIdService({ uid });

    await updateUserEmailService({
      uid: findUserByIdResult?.uid!,
      email: email,
    });

    res.status(201).send({
      error: false,
      message: 'Update Email Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const findUserByEmailResult = await findUserByEmailService({ email });

    if (!findUserByEmailResult)
      throw new Error('Please Register Your Email First');

    if (findUserByEmailResult.verify == 'VERIFIED')
      throw new Error('Your Account Already Verify');

    const accesstoken = await createVerificationToken({
      uid: findUserByEmailResult.uid,
    });

    await sendMail({
      accesstoken: accesstoken,
      username: findUserByEmailResult.email,
      email: findUserByEmailResult.email,
      link: 'verification',
      subject: 'Verify Your Account',
    });
  } catch (error) {
    next(error);
  }
};

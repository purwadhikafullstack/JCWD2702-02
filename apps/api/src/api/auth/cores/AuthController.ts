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
  expiredUserEmailVerificationInfo,
  findEmailVerificationHistoryResult,
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
      findUserEmailVerificationInfoResult?.status !== 'DONE' &&
      currTime <= findUserEmailVerificationInfoResult?.expireIn.toISOString()!
    ) {
      throw new Error(
        'We Already Sent The Link To Your Email Expire In 1 Hour',
      );
    }

    if (
      findUserEmailVerificationInfoResult &&
      findUserEmailVerificationInfoResult.status !== 'DONE'
    ) {
      await expiredUserEmailVerificationInfo({
        uid: findUserEmailVerificationInfoResult?.userId!,
        id: findUserEmailVerificationInfoResult?.id!,
      });
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

    const currTime = await currentTime();

    if (email != confirmEmail) throw new Error("Email Doesn't Match");

    const findUserByIdResult = await findUserByIdService({ uid });

    const findEmailVerificationResult =
      await findEmailVerificationHistoryResult({ uid });

    if (
      findEmailVerificationResult?.status == 'DONE' ||
      currTime >= findEmailVerificationResult?.expireIn.toISOString()!
    ) {
      await expiredUserEmailVerificationInfo({
        uid: findEmailVerificationResult?.userId!,
        id: findEmailVerificationResult?.id!,
      });
      throw new Error('Please Request New Link');
    }

    const accesstoken = await createVerificationToken({ uid });

    await sendMail({
      accesstoken: accesstoken,
      username: email,
      email: email,
      link: 'confirm-email',
      subject: 'Change Email Confirmation',
    });

    await updateUserEmailService({
      uid,
      email: email,
    });

    res.status(201).send({
      error: false,
      message: 'Link Change Email Has Been Sent To Your Email',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const changeEmailConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { email, confirmEmail } = req.body;
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

    const currTime = await currentTime();
    const expireInOneHour = await defaultExpireTime(1);

    const findUserByEmailResult = await findUserByEmailService({ email });

    if (!findUserByEmailResult)
      throw new Error('Please Register Your Email First');

    if (findUserByEmailResult.verify == 'VERIFIED')
      throw new Error('Your Account Already Verify');

    const findUserEmailVerificationInfoResult =
      await findUserEmailVerificationInfoService({
        uid: findUserByEmailResult?.uid,
      });

    if (
      findUserEmailVerificationInfoResult?.status !== 'DONE' &&
      currTime <= findUserEmailVerificationInfoResult?.expireIn.toISOString()!
    ) {
      throw new Error(
        'We Already Sent The Link To Your Email Expire In 1 Hour',
      );
    }

    if (
      findUserEmailVerificationInfoResult &&
      findUserEmailVerificationInfoResult.status !== 'DONE'
    ) {
      await expiredUserEmailVerificationInfo({
        uid: findUserEmailVerificationInfoResult.userId,
        id: findUserEmailVerificationInfoResult.id,
      });
    }

    await createUserEmailVerificationInfoService({
      uid: findUserByEmailResult.uid,
      date: expireInOneHour,
    });

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

    res.status(201).send({
      error: false,
      message: 'Check Your Email For Reset Password Link',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const currTime = await currentTime();
    const expireInOneHour = await defaultExpireTime(1);

    const findUserByEmailResult = await findUserByEmailService({ email });
    const findUserResetPasswordInfoResult =
      await findUserResetPasswordInfoService({
        uid: findUserByEmailResult?.uid!,
      });

    if (!findUserByEmailResult) throw new Error('Please Register First');

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
        uid: findUserResetPasswordInfoResult?.userId,
        id: findUserResetPasswordInfoResult?.id,
      });
    }

    await createUserPasswordInfoService({
      uid: findUserByEmailResult?.uid,
      date: expireInOneHour,
    });

    const accesstoken = await createVerificationToken({
      uid: findUserByEmailResult.uid,
    });

    await sendMail({
      accesstoken: accesstoken,
      username: findUserByEmailResult?.email,
      email: findUserByEmailResult?.email,
      link: 'reset-password',
      subject: 'Reset Password',
    });

    res.status(201).send({
      error: false,
      message: 'Check Your Email For Reset Password Link',
      data: {
        acctkn: accesstoken,
      },
    });
  } catch (error) {
    next(error);
  }
};

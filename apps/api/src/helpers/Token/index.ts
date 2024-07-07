import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { IReqAccessToken } from './TokenType';

dotenv.config();

export const createToken = ({ uid }: { uid: string }) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1d',
  });
};

export const createUserRegisterToken = ({ uid }: { uid: string }) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1h',
  });
};

export const createOauthToken = ({ uid }: { uid: string }) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1h',
  });
};

export const createVerificationToken = ({ uid }: { uid: string }) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1h',
  });
};

export const tokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { accesstoken } = req.headers;

    if (!accesstoken) throw new Error('Please login first!');

    const decodedPayload = jwt.verify(
      accesstoken as string,
      process.env.JWT_SECRET_KEY as string,
    );

    reqToken.payload = decodedPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export const KeepLoginTokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { accesstoken } = req.headers;

    if (!accesstoken) return;

    const decodedPayload = jwt.verify(
      accesstoken as string,
      process.env.JWT_SECRET_KEY as string,
    );

    reqToken.payload = decodedPayload;

    next();
  } catch (error) {
    next(error);
  }
};

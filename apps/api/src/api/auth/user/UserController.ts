import { Request, Response, NextFunction } from 'express';
import { findUserByIdService } from '../cores/AuthService';
import {
  userImageUploadService,
  createUserAddressService,
} from './UserService';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import fs from 'fs';

export const userImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    let uploadedUserImageUrl;
    if (req.files) {
      uploadedUserImageUrl = Array.isArray(req.files)
        ? req.files
        : req.files['userimageurl'];
    }

    const findUserByIdResult = await findUserByIdService({ uid });

    if (!findUserByIdResult) throw new Error('User Not Fount');

    const prevUserImageUrl = findUserByIdResult?.userImageUrl;

    await userImageUploadService({
      uid: findUserByIdResult?.uid,
      imageUrl: uploadedUserImageUrl![0].path,
    });

    if (prevUserImageUrl) fs.rmSync(prevUserImageUrl);

    res.status(201).send({
      error: false,
      message: 'Upload Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const userAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { recipients, address, phoneNumber, postalCode } = req.body;

    await createUserAddressService({
      uid,
      recipients,
      address,
      phoneNumber,
      postalCode,
    });

    res.status(201).send({
      error: false,
      message: 'Create User Address Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

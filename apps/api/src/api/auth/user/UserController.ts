import { query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { findUserByIdService } from '../cores/AuthService';
import {
  userImageUploadService,
  createUserAddressService,
  findUserAddressService,
  mainUserAddressService,
  findUserAddressDetailService,
  deleteUserAddressService,
  findAddressDetailService,
  updateUserAddressService,
  findAllUserAddressService,
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

    if (!findUserByIdResult) throw new Error('User Not Found');

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

export const createUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const {
      recipients,
      address,
      province,
      provinceId,
      city,
      cityId,
      phoneNumber,
      postalCode,
      longitude,
      latitude,
    } = req.body;

    await createUserAddressService({
      uid,
      recipients,
      address,
      province,
      provinceId,
      city,
      cityId,
      phoneNumber,
      postalCode,
      longitude,
      latitude,
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

export const findUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const findUserAddressResult = await findUserAddressService({
      uid,
    });

    res.status(201).send({
      error: false,
      message: 'Get User Address',
      data: findUserAddressResult,
    });
  } catch (error) {
    next(error);
  }
};

export const mainUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { addressId } = req.body;

    const addressValidator = await findUserAddressDetailService({
      uid,
      addressId,
    });

    if (addressValidator?.main == 'TRUE')
      throw new Error('This Address Already Main Address');

    await mainUserAddressService({ uid, addressId });

    res.status(201).send({
      error: false,
      message: 'Main User Address Change',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const findUserAddressDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { addressId } = req.query;

    const findAddressDetailResult = await findUserAddressDetailService({
      uid,
      addressId: Number(addressId),
    });

    res.status(201).send({
      error: false,
      message: 'Get Address Detail',
      data: findAddressDetailResult,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { addressId } = req.query;

    await deleteUserAddressService({ uid, addressId: Number(addressId) });

    res.status(201).send({
      error: false,
      message: 'Delete Address Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getAddressDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { addressId } = req.query;

    const findAddressDetailResult = await findAddressDetailService(
      Number(addressId),
    );

    return res.status(201).send({
      error: false,
      message: 'Get Address Detail',
      data: findAddressDetailResult,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const {
      recipients,
      address,
      province,
      provinceId,
      city,
      cityId,
      phoneNumber,
      postalCode,
      longitude,
      latitude,
    } = req.body;
    const { addressId } = req.query;

    await updateUserAddressService({
      addressId: Number(addressId),
      uid,
      recipients,
      address,
      province,
      provinceId,
      city,
      cityId,
      phoneNumber,
      postalCode,
      longitude,
      latitude,
    });

    res.status(201).send({
      error: false,
      message: 'Update Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

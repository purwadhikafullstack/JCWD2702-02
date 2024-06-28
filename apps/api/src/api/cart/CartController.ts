import { Request, Response, NextFunction } from 'express';
import {
  addToCartQuery,
  getUserCartQuery,
  getCartDetailService,
  addToCartDetailService,
} from './CartService';
import { IReqAccessToken } from '@/helpers/Token/TokenType';

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { productId, qty } = req.body;

    if (qty < 1) throw new Error('Please input valid quantity');

    await addToCartQuery(uid, productId, qty);

    return res.status(201).send({
      error: false,
      message: 'Add To Cart Success!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const getUserCartResult = await getUserCartQuery(uid);

    res.status(201).send({
      error: false,
      message: 'Get User Cart',
      data: getUserCartResult,
    });
  } catch (error) {
    next(error);
  }
};

export const getCartDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { productId } = req.query;

    const { findCartDetail, findProductImage } = await getCartDetailService({
      uid,
      productId: Number(productId),
    });

    res.status(201).send({
      error: false,
      message: 'Get Cart Detail',
      data: {
        cartDetail: findCartDetail,
        productImage: findProductImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addToCartDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { productId } = req.query;
    const { qty } = req.body;

    await addToCartDetailService({
      uid,
      productId: Number(productId),
      qty,
    });

    res.status(201).send({
      error: false,
      message: 'OK',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

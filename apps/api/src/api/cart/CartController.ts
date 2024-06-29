import { Request, Response, NextFunction } from 'express';
import {
  addToCartQuery,
  getUserCartQuery,
  getCartDetailService,
  addToCartDetailService,
  deleteCartService,
  setSelectedCartService,
  selectAllService,
  getCheckoutCartService,
  findNearestWarehouseService,
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

    let totalPrice = 0;
    let totalWeight = 0;
    for (let i = 0; i < getUserCartResult.length; i++) {
      if (getUserCartResult[i].selected == true) {
        totalPrice += getUserCartResult[i].price;
      }
    }

    for (let i = 0; i < getUserCartResult.length; i++) {
      if (getUserCartResult[i].selected == true) {
        totalWeight +=
          getUserCartResult[i].qty * getUserCartResult[i].Product.weight!;
      }
    }

    res.status(201).send({
      error: false,
      message: 'Get User Cart',
      data: {
        userCart: getUserCartResult,
        totalPrice,
        totalWeight,
      },
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

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cartId } = req.query;

    await deleteCartService(Number(cartId));

    res.status(201).send({
      error: false,
      message: 'Delete Success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const setSelectedCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { isChecked } = req.query;
    const { productId } = req.body;

    await setSelectedCartService(isChecked as any, productId);

    res.status(201).send({
      error: false,
      message: 'OK',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const selectAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reqToken = req as IReqAccessToken;
  const { uid } = reqToken.payload;

  const { isChecked } = req.query;

  await selectAllService(isChecked, uid);

  res.status(201).send({
    error: false,
    message: 'OK',
    data: null,
  });
  try {
  } catch (error) {
    next(error);
  }
};

export const getCheckoutCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const getCheckoutCartResult = await getCheckoutCartService(uid);

    res.status(201).send({
      error: false,
      message: 'Get Selected Carts',
      data: getCheckoutCartResult,
    });
  } catch (error) {
    next(error);
  }
};

export const getNearestWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { addressId } = req.body;

    const findNearestWarehouseResult = await findNearestWarehouseService({
      uid,
      addressId,
    });

    res.status(201).send({
      error: false,
      message: 'Get Nearest Warehouse',
      data: findNearestWarehouseResult,
    });
  } catch (error) {
    next(error);
  }
};

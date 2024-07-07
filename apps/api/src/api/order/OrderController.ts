import { Request, Response, NextFunction } from 'express';
import {
  OrderService,
  getCheckoutMidtransService,
  createOrderService,
  getUserOrderService,
  getTransactionByIdService,
  updateTransactionStatusService,
  cancelReservedQuatityService,
  getTransactionDetailService,
} from './OrderService';
import { orderStockHistoryQuery } from '../stock/StockService';
import { Order } from './OrderTypes';
import { IReqAccessToken } from '@/helpers/Token/TokenType';
import { orderGenerator } from '@/helpers/Randomizer';
import { findUserByIdService } from '../auth/cores/AuthService';
import axios from 'axios';
import crypto from 'crypto';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_BASE_URL = 'https://api.sandbox.midtrans.com/v2';

const orderService = new OrderService();

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const order: Order = req.body;
      const createdOrder = await orderService.createOrder(order);
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export const checkoutMidtrans = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { grossAmount, shippingCost, addressId } = req.body;

    const findUserResult = await findUserByIdService({ uid });

    const getCheckoutCartResult = await getCheckoutMidtransService(uid);

    const orderId = await orderGenerator();

    const authString = btoa(`${MIDTRANS_SERVER_KEY}:`);

    const totalItemAmount = getCheckoutCartResult.reduce(
      (sum, product) => sum + product.Product.price * product.qty,
      0,
    );

    const totalAmount = totalItemAmount + Number(shippingCost);

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalAmount,
      },
      item_details: [
        ...getCheckoutCartResult.map((product) => ({
          id: product.id,
          price: product.Product.price,
          quantity: product.qty,
          name: product.Product.name,
        })),
        {
          id: 'shipping',
          price: Number(shippingCost),
          quantity: 1,
          name: 'Shipping Cost',
        },
      ],
      customer_details: {
        first_name: findUserResult?.fullname,
        email: findUserResult?.email,
      },
    };

    const response = await fetch(
      `${process.env.MIDTRANS_APP_URL}/snap/v1/transactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    await createOrderService({
      uid,
      orderId: Number(orderId),
      addressId,
      totalAmount,
      shippingCost: Number(shippingCost),
      paymentUrl: data.redirect_url,
    });

    res.status(201).send({
      error: false,
      message: 'Create transaction success',
      data: {
        token: data.token,
        redirectUrl: data.redirect_url,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { page, status } = req.query;

    const limit = 3;

    const { result, totalOrder } = await getUserOrderService(
      uid,
      Number(page),
      limit,
      status as string,
    );

    res.status(201).send({
      error: false,
      message: 'Get user order',
      data: { data: result, totalPages: Math.ceil(totalOrder / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusBasedOnMidtransResponse = async (
  transaction_id: any,
  data: any,
) => {
  const hash = crypto
    .createHash('sha512')
    .update(
      `${transaction_id}${data.status_code}${data.gross_amount}${MIDTRANS_SERVER_KEY}`,
    )
    .digest('hex');
  if (data.signature_key !== hash) {
    return {
      status: 'error',
      message: 'Invalid Signature key',
    };
  }

  let responseData = null;
  let orderId = data.order_id;
  let transactionStatus = data.transaction_status;
  let fraudStatus = data.fraud_status;

  if (transactionStatus == 'capture') {
    if (fraudStatus == 'accept') {
      const transaction = await updateTransactionStatusService({
        orderId: Number(orderId),
        status: 'PAID',
      });

      await orderStockHistoryQuery(Number(orderId));

      responseData = transaction;
    }
  } else if (transactionStatus == 'settlement') {
    const transaction = await updateTransactionStatusService({
      orderId: Number(orderId),
      status: 'PAID',
    });

    await orderStockHistoryQuery(Number(orderId));

    responseData = transaction;
  } else if (
    transactionStatus == 'cancel' ||
    transactionStatus == 'deny' ||
    transactionStatus == 'expire'
  ) {
    const transaction = await updateTransactionStatusService({
      orderId: Number(orderId),
      status: 'CANCELLED',
    });

    await cancelReservedQuatityService(Number(orderId));

    responseData = transaction;
  } else if (transactionStatus == 'pending') {
    const transaction = await updateTransactionStatusService({
      orderId: Number(orderId),
      status: 'WAITING_FOR_PAYMENT',
    });

    responseData = transaction;
  }

  return {
    status: 'success',
    data: responseData,
  };
};

export const midtransNotif = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    let orderId = data.order_id;

    getTransactionByIdService(Number(orderId)).then((transaction: any) => {
      if (transaction) {
        updateStatusBasedOnMidtransResponse(orderId, data).then((res) => {
          console.log(res);
        });
      }
    });

    return res.status(200).json({
      status: 'success',
      message: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

export const test = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.body;

    await cancelReservedQuatityService(Number(orderId));
  } catch (error) {
    next(error);
  }
};

export const getTransactionDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { orderId } = req.query;

    const getTransactionResult = await getTransactionDetailService(
      Number(orderId),
      uid,
    );

    if (!getTransactionResult) throw new Error('Transaction not found');

    res.status(201).send({
      error: false,
      message: 'OK',
      data: getTransactionResult,
    });
  } catch (error) {
    next(error);
  }
};

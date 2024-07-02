import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const RAJA_ONGKIR_API_URL = process.env.RAJA_ONGKIR_API_URL;
const RAJA_ONGKIR_API_KEY = process.env.RAJA_ONGKIR_API_KEY;

export const getProvince = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await axios.get(`${RAJA_ONGKIR_API_URL}/province`, {
      headers: {
        key: RAJA_ONGKIR_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    res.status(201).send({
      error: false,
      message: 'Get Province',
      data: response.data.rajaongkir.results,
    });
  } catch (error) {
    next(error);
  }
};

export const getCities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { provinceId } = req.query;
    const response = await axios.get(
      `${RAJA_ONGKIR_API_URL}/city?province=${provinceId}`,
      {
        headers: {
          key: RAJA_ONGKIR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    res.status(201).send({
      error: false,
      message: 'Get Cities by Province Id',
      data: response.data.rajaongkir.results,
    });
  } catch (error) {
    next(error);
  }
};

export const getCityDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cityId, provinceId } = req.query;
    const response = await axios.get(
      `${RAJA_ONGKIR_API_URL}/city?province=${provinceId}&id=${cityId}`,
      {
        headers: {
          key: RAJA_ONGKIR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    res.status(201).send({
      error: false,
      message: 'Get City Detailed',
      data: response.data.rajaongkir.results,
    });
  } catch (error) {
    next(error);
  }
};

export const shippingCost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { origin, destination, weight, courier } = req.query;
    const response = await axios.post(
      `${RAJA_ONGKIR_API_URL}/cost`,
      {
        origin,
        destination,
        weight,
        courier,
      },
      {
        headers: {
          key: RAJA_ONGKIR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    res.status(201).send({
      error: false,
      message: 'Shipping Cost',
      data: response.data.rajaongkir.results[0].costs,
    });
  } catch (error) {
    next(error);
  }
};

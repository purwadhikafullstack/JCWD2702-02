import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common['key'] = process.env.RAJA_ONGKIR_API_KEY;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export const getProvince = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await axios.get('/province');

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
    const response = await axios.get(`/city?province=${provinceId}`);

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
      `/city?province=${provinceId}&id=${cityId}`,
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

    const response = await axios.post('/cost', {
      origin: origin,
      destination,
      weight,
      courier,
    });

    console.log(response.data.rajaongkir.results[0].costs);

    res.status(201).send({
      error: false,
      message: 'Shipping Cost',
      data: response.data.rajaongkir.results[0].costs,
    });
  } catch (error) {
    next(error);
  }
};

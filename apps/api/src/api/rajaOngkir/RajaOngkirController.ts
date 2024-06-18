import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common['key'] = '9893a1ee86c04676e760c8481ef179fa';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export const getProvince = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await axios.get('/province');

    // console.log(response);

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

    console.log(req.query);

    const response = await axios.get(
      `/city?province=${provinceId}&id=${cityId}`,
    );

    console.log(response.data.rajaongkir.results);

    res.status(201).send({
      error: false,
      message: 'Get City Detailed',
      data: response.data.rajaongkir.results,
    });
  } catch (error) {
    next(error);
  }
};

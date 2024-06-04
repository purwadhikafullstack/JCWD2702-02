import { Request } from 'express';

export interface IReqAccessToken extends Request {
  payload: any;
  headers: {
    accesstoken: string;
  };
}

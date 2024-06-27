import { NextFunction, Response, Request } from 'express';
import { findAdminByIdService } from '@/api/auth/admin/AdminService';
import { IReqAccessToken } from '@/helpers/Token/TokenType';

interface IReqPayload extends Request {
  payload: any;
}

export const roleVerifySuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqPayload = req as IReqPayload;
    const payload = reqPayload.payload;

    const findAdminResult = await findAdminByIdService({ uid: payload.uid });

    if (!findAdminResult) throw new Error('Admin Not Found');

    if (findAdminResult?.adminRole == 1) {
      next();
    } else {
      throw new Error('Unauthorized User');
    }
  } catch (error) {
    next(error);
  }
};

export const warehouseAdminVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqPayload = req as IReqPayload;
    const payload = reqPayload.payload;
    const { id } = req.params;

    const findAdminResult = await findAdminByIdService({ uid: payload.uid });

    if (findAdminResult?.Role.id == 1) {
      next();
    } else if ((findAdminResult?.warehouseId as any) != id) {
      throw new Error('Unauthorized User');
    }

    next()
  } catch (error) {
    next(error);
  }
};

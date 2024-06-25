import { NextFunction, Response, Request } from 'express';
// import { findEmployeeByUid } from '../services/AuthService';
import { findAdminByIdService } from '@/api/auth/admin/AdminService';

interface IReqPayload extends Request {
  payload: any;
}

// export const roleVerifyHRAndManager = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const reqPayload = req as IReqPayload;
//     const payload = reqPayload.payload;

//     const findEmployeeByUidResult = await findEmployeeByUid({
//       uid: payload.uid,
//     });
//     if (!findEmployeeByUidResult) throw new Error('User Not Found!');

//     const authorized = ['HR', 'Manager'];
//     if (authorized.includes(findEmployeeByUidResult?.position.name)) {
//       next();
//     } else {
//       throw new Error('Unauthorized User');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

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

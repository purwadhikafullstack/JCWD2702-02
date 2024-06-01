import { Request, Response, NextFunction } from 'express';
import { getRolesService } from './RolesService';

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getRolesResult = await getRolesService();
    res.status(201).send({
      error: false,
      meesage: 'Get Roles',
      data: getRolesResult,
    });
  } catch (error) {
    next(error);
  }
};

import { body, param, query } from 'express-validator';

export const deleteAdminValidator = [
  query('userId').isUUID().withMessage('must be a valid UUID'),
];

export const deleteUserValidator = [
  query('userId').isUUID().withMessage('must be a valid UUID'),
];

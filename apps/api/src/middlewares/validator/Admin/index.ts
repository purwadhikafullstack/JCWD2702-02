import { body, check, param, query } from 'express-validator';

export const deleteAdminValidator = [
  query('userId').isUUID().withMessage('must be a valid UUID'),
];

export const deleteUserValidator = [
  query('userId').isUUID().withMessage('must be a valid UUID'),
];

export const AdminLoginValidator = [
  body(['email', 'password']).notEmpty().withMessage('Data Must Completed!'),
  body('email').isString().isEmail().withMessage('Email Must Valid!'),
];

export const getWarehouseAdminDetailValidator = [
  query('adminId').isUUID().withMessage('must be a valid UUID'),
];

export const assignWarehouseAdminValidator = [
  body(['uid', 'name', 'email', 'warehouseId'])
    .notEmpty()
    .withMessage('Data Must Completed!'),
  check('uid').isUUID().withMessage('must be a valid UUID'),
  body('email').isString().isEmail().withMessage('Email Must Valid!'),
];

export const getUserDetailValidator = [
  query('userId').isUUID().withMessage('must be a valid UUID'),
];

export const createUserValidator = [
  body(['fullname', 'email', 'password'])
    .notEmpty()
    .withMessage('Data Must Completed!'),
  body('email').isString().isEmail().withMessage('Email Must Valid!'),
];

export const updateUserDataValidator = [
  body(['fullname', 'email', 'verify'])
    .notEmpty()
    .withMessage('Data Must Completed!'),
  body('email').isString().isEmail().withMessage('Email Must Valid!'),
];

export const createWarehouseValidator = [
  body([
    'name',
    'province',
    'provinceId',
    'city',
    'cityId',
    'detail',
    'postalCode',
    'longitude',
    'latitude',
  ])
    .notEmpty()
    .withMessage('Data Must Completed!'),
];

export const getWarehouseDetailValidator = [
  query('id').notEmpty().withMessage('Warehouse Id must be provided'),
];

export const updateWarehouseValidator = [
  query('id').notEmpty().withMessage('Warehouse Id must be provided'),

  body([
    'name',
    'province',
    'provinceId',
    'city',
    'cityId',
    'detail',
    'postalCode',
    'longitude',
    'latitude',
  ])
    .notEmpty()
    .withMessage('Data Must Completed!'),
];

export const createAdminValidator = [
  body(['fullname', 'email', 'password'])
    .notEmpty()
    .withMessage('Data Must Completed!'),
];

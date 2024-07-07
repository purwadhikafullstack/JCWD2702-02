import { body } from 'express-validator';

export const userRegisterValidator = [
  body(['fullname', 'email']).notEmpty().withMessage('Data Must Completed!'),
  body('email').isString().isEmail().withMessage('Email Must Valid!'),
];

import { body } from "express-validator";

export const validatorUpdateProduct = [
    body(['name', 'description', 'price', 'categoryId', 'weight']).notEmpty().withMessage('Data Must Completed!'),
    body('price').isNumeric().withMessage('Price Must a Number!'),
    body('weight').isNumeric().withMessage('Weight Must a Number!'),
    body(['name', 'description']).isString().withMessage('Name and Description Must a String!'),
]
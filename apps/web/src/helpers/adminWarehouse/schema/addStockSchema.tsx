import * as Yup from 'yup';

export const addStockSchema = Yup.object().shape({
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
})
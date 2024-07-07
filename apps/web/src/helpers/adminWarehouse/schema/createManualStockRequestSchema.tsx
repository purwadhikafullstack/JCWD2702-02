import * as Yup from 'yup';

export const createManualStockRequestSchema = Yup.object().shape({
    quantity: Yup.number().required('Quantity is required for a request').positive('Quantity must be a positive number'),
    warehouseSource: Yup.number().required('Warehouse source is required for a request').notOneOf([0], 'Warehouse source needs to be selected'),
})
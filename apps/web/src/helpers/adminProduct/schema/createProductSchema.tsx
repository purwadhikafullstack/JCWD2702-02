import * as Yup from 'yup';

export const createProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    categoryId: Yup.number().required('Required'),
    weight: Yup.number().required('Required'),
})
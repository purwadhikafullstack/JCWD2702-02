import * as Yup from 'yup'

export const createWarehouseSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  province: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  detail: Yup.string().min(2, 'Too Short!').required('Required'),
  postalCode: Yup.string()
    .min(5, 'Too Short!')
    .max(8, 'Too Long!')
    .required('Required'),
  longitude: Yup.string().required('Required'),
  latitude: Yup.string().required('Required'),
})

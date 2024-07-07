import * as Yup from 'yup'

export const createUserAddressSchema = Yup.object().shape({
  recipients: Yup.string().max(50, 'Too Long!').required('Required'),
  address: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNumber: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  province: Yup.string().required('Required'),
  provinceId: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  cityId: Yup.string().required('Required'),
})

import * as Yup from 'yup'

export const userRegisterSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  // password: Yup.string()
  //   .min(8, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // confirmPassword: Yup.string()
  //   .min(8, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
})

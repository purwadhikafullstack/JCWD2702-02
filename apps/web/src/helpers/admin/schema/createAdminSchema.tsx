import * as Yup from 'yup'

export const createAdminSchema = Yup.object().shape({
  fullname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

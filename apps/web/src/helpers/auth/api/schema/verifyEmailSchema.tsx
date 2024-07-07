import * as Yup from 'yup'

export const verifyEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

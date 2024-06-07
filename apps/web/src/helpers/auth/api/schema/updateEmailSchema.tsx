import * as Yup from 'yup'

export const updateEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  confirmEmail: Yup.string().email('Invalid email').required('Required'),
})

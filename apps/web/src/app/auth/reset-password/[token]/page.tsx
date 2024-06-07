'use client'
import { Formik, Form } from 'formik'
import { userRegisterVerificationSchema } from '@/helpers/verification/schema/userRegisterVerificationSchema'
import VerificationComponent from '@/components/cores/Verification'
import { useUpdatePassword } from './../../../../helpers/auth/hooks/password/useUpdatePassword'
import { MdLock, MdLockOutline } from 'react-icons/md'

export default function ResetPassword({ params }: any) {
  const { mutationUpdatePassword } = useUpdatePassword()
  const token = params.token as string

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={userRegisterVerificationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values)
        mutationUpdatePassword({
          accesstoken: token,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form>
            <VerificationComponent
              header={'Reset Password'}
              initVal1={'password'}
              initVal2={'confirmPassword'}
              labelVal1={'Password*'}
              labelVal2={'Confirm Password*'}
              iconVal1={<MdLock />}
              iconVal2={<MdLockOutline />}
              type={'password'}
              placeholdeVal1={'Password'}
              placeholdeVal2={'Confirm Password'}
              dirty={dirty}
              isValid={isValid}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

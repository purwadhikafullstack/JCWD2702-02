'use client'
import { useVerification } from './../../../../helpers/verification/hooks/useVerification'
import { Formik, Form } from 'formik'
import { userRegisterVerificationSchema } from '@/helpers/verification/schema/userRegisterVerificationSchema'
import { MdLock, MdLockOutline } from 'react-icons/md'
import VerificationComponent from '@/components/cores/Verification'

export default function Verification({ params }: any) {
  const { mutationVerification } = useVerification()
  const token = params.token as string

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={userRegisterVerificationSchema}
      onSubmit={(values, { resetForm }) => {
        mutationVerification({
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
              header={'Verify Your Account'}
              initVal1={'password'}
              initVal2={'confirmPassword'}
              iconVal1={<MdLock />}
              iconVal2={<MdLockOutline />}
              labelVal1={'Password*'}
              labelVal2={'Confirm Password*'}
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

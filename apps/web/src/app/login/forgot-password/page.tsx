'use client'
import { Formik } from 'formik'
import { verifyEmailSchema } from '@/helpers/auth/api/schema/verifyEmailSchema'
import ResendVerification from '@/components/cores/ResendVerification'
import { useForgotPassword } from '@/helpers/login/hooks/useForgotPassword'

export default function VerifyEmailPage() {
  const { mutationForgotPassword } = useForgotPassword()
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={verifyEmailSchema}
      onSubmit={(values, { resetForm }) => {
        mutationForgotPassword({
          email: values.email,
        })
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <ResendVerification
            dirty={dirty}
            isValid={isValid}
            subject={'Input Your Email'}
          />
        )
      }}
    </Formik>
  )
}

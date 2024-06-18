'use client'
import { Formik } from 'formik'
import { verifyEmailSchema } from '@/helpers/auth/api/schema/verifyEmailSchema'
import { useResendEmailVerify } from '@/helpers/register/hooks/userResendVerifyEmail'
import ResendVerification from '@/components/cores/ResendVerification'

export default function VerifyEmailPage() {
  const { mutationResendEmail } = useResendEmailVerify()
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={verifyEmailSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values)
        mutationResendEmail({
          email: values.email,
        })
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <ResendVerification
            dirty={dirty}
            isValid={isValid}
            subject={'Verify Your Account'}
          />
        )
      }}
    </Formik>
  )
}

'use client'
import { Formik, Form } from 'formik'
import { updateEmailSchema } from '@/helpers/auth/api/schema/updateEmailSchema'
import VerificationComponent from '@/components/cores/Verification'
import { useUpdateEmail } from '@/helpers/auth/hooks/email/useUpdateEmail'
import { MdEmail, MdOutlineEmail } from 'react-icons/md'

export default function UpdateEmail({ params }: any) {
  const token = params.token as string
  const { mutationUpdateEmail } = useUpdateEmail()

  return (
    <Formik
      initialValues={{
        email: '',
        confirmEmail: '',
      }}
      validationSchema={updateEmailSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values)
        mutationUpdateEmail({
          accesstoken: token,
          email: values.email,
          confirmEmail: values.confirmEmail,
        })
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form>
            <VerificationComponent
              header={'Update Your Email'}
              initVal1={'email'}
              initVal2={'confirmEmail'}
              iconVal1={<MdEmail />}
              iconVal2={<MdOutlineEmail />}
              labelVal1={'Email*'}
              labelVal2={'Confirm Email*'}
              placeholdeVal1={'Email'}
              placeholdeVal2={'Confirm Email'}
              type={'email'}
              dirty={dirty}
              isValid={isValid}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

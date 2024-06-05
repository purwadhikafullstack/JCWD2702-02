'use client'
import Link from 'next/link'
import { useVerification } from './../../../helpers/verification/hooks/useVerification'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { userRegisterVerificationSchema } from '@/helpers/verification/schema/userRegisterVerificationSchema'
import { MdLock, MdLockOutline } from 'react-icons/md'

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
            <div className='flex h-fit items-center justify-center p-[100px]'>
              <div className='flex h-[500px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
                <div className='flex flex-col gap-[25px]'>
                  <div className='text-[25px] font-bold'>
                    Verify Your Account
                  </div>
                </div>
                <div className='flex w-full flex-col gap-10'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center font-bold'>
                      Password*
                      <MdLock />
                    </div>
                    <div>
                      <label className='input input-bordered flex w-full items-center gap-2'>
                        <Field
                          type='password'
                          className='grow'
                          placeholder='Password'
                          name='password'
                        />
                      </label>
                      <ErrorMessage
                        name='password'
                        component='div'
                        className='text-red-500'
                      />
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center font-bold'>
                      Confirm Password*
                      <MdLockOutline />
                    </div>
                    <div>
                      <label className='input input-bordered flex w-full items-center gap-2'>
                        <Field
                          type='password'
                          className='grow'
                          placeholder='Confirm Password'
                          name='confirmPassword'
                        />
                      </label>
                      <ErrorMessage
                        name='confirmPassword'
                        component='div'
                        className='text-red-500'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex w-full flex-col'>
                  <button
                    type='submit'
                    className='rounded-m bg-cerulean btn flex w-full justify-center bg-eggplant text-white hover:bg-hover_eggplant'
                    disabled={!(dirty && isValid)}
                  >
                    Verify
                  </button>
                  <div className='divider'></div>
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

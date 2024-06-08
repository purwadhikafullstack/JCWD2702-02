'use client'
import { MdEmail } from 'react-icons/md'
import { Formik, Form, Field } from 'formik'
import { verifyEmailSchema } from '@/helpers/auth/api/schema/verifyEmailSchema'

export default function VerifyEmailPage() {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={verifyEmailSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values)
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form>
            <div className='flex h-screen items-center justify-center p-[100px]'>
              <div className='flex h-[400px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
                <div className='flex flex-col gap-[25px]'>
                  <div className='text-[25px] font-bold'>
                    Input Your Email to Verify
                  </div>
                </div>
                <div className='flex w-full flex-col gap-10'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center font-bold'>
                      Email*
                      <MdEmail />
                    </div>
                    <div>
                      <label className='input input-bordered flex w-full items-center gap-2'>
                        <Field
                          type='text'
                          className='grow'
                          placeholder='Email'
                          name='email'
                        />
                      </label>
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

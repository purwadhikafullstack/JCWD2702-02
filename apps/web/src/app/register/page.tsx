'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRegister } from '../../helpers/register/hooks/useRegister'
import { userRegisterSchema } from '@/helpers/register/schema/userRegisterSchema'
import { MdEmail, MdPeople } from 'react-icons/md'
import GoogleSignUpButton from '../../components/cores/Google'

export default function Register() {
  const { mutationRegister, isPending } = useRegister()

  return (
    <Formik
      initialValues={{
        fullname: '',
        email: '',
      }}
      validationSchema={userRegisterSchema}
      onSubmit={(values, { resetForm }) => {
        mutationRegister({
          fullname: values.fullname,
          email: values.email,
        })
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form>
            <div className='flex h-fit items-center justify-center p-[100px]'>
              <div className='flex h-[600px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
                <div className='flex flex-col gap-[25px]'>
                  <div className='text-[25px] font-bold'>
                    Register Your Account
                  </div>
                  <div className='text-[15px]'>
                    Already Have Account?{' '}
                    <a
                      href='/login'
                      className='text-eggplant underline underline-offset-2 hover:text-hover_eggplant'
                    >
                      Login now
                    </a>
                  </div>
                  <div className='text-[15px]'>
                    <a
                      href='/register/verification'
                      className='text-eggplant underline underline-offset-2 hover:text-hover_eggplant'
                    >
                      Verify Your Account
                    </a>
                  </div>
                </div>
                <div className='flex w-full flex-col gap-10'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center font-bold'>
                      Fullname*
                      <MdPeople />
                    </div>
                    <div>
                      <label className='input input-bordered flex w-full items-center gap-2'>
                        <Field
                          type='text'
                          className='grow'
                          placeholder='Fullname'
                          name='fullname'
                        />
                      </label>
                    </div>
                  </div>
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
                    disabled={!(dirty && isValid) || isPending == true}
                  >
                    Register
                  </button>
                  <div className='divider'></div>
                  <GoogleSignUpButton subject={'Register in with Google'} />
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

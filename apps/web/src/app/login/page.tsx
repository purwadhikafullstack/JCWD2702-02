'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { userLoginSchema } from '../../helpers/login/schema/userLoginSchema'
import { MdEmail, MdLock } from 'react-icons/md'
import { useUserLogin } from '../../helpers/login/hooks/useUserLogin'

export default function Login() {
  const { mutationLogin, isPending } = useUserLogin()
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={userLoginSchema}
      onSubmit={(values) => {
        // console.log(values)
        mutationLogin({
          email: values.email,
          password: values.password,
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
                    Login to Your Account
                  </div>
                  <div className='text-[15px]'>
                    Dont have an account?{' '}
                    <a
                      href='/register/user'
                      className='text-eggplant hover:text-hover_eggplant underline underline-offset-2'
                    >
                      Sign up now
                    </a>
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
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='text-red-500'
                      />
                    </div>
                  </div>
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
                </div>
                <div className='flex w-full flex-col'>
                  <button
                    type='submit'
                    className='rounded-m btn bg-eggplant bg-azureBlue hover:bg-hover_eggplant flex w-full justify-center text-white'
                    disabled={!(dirty && isValid)}
                  >
                    LOG IN
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

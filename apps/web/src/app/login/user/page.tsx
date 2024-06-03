'use client'
import { Formik, Form, Field } from 'formik'
// import { useLogin } from './../../../hooks/useLogin';
import { MdEmail, MdLock } from 'react-icons/md'

export default function Login() {
  //   const { mutationLogin } = useLogin()

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        console.log(test)
        // mutationLogin({
        //   email: values.email,
        //   password: values.password,
        // })
      }}
    >
      <Form>
        <div className='flex h-fit items-center justify-center p-[100px]'>
          <div className='flex h-[600px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
            <div className='flex flex-col gap-[25px]'>
              <div className='text-[25px] font-bold'>Login to buy a ticket</div>
              <div className='text-[15px]'>
                Dont have an account?{' '}
                <a
                  href='/register/user'
                  className='text-azureBlue underline underline-offset-2'
                >
                  Sign up now
                </a>
              </div>
              <div className='text-[15px]'>
                Want to create event?{' '}
                <a
                  href='/login/event-organizer'
                  className='text-azureBlue underline underline-offset-2'
                >
                  Login as Event Organizer
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
                </div>
              </div>
            </div>
            <div className='flex w-full flex-col'>
              <button
                type='submit'
                className='rounded-m btn bg-cerulean bg-azureBlue hover:bg-scienceBlue flex w-full justify-center text-white'
              >
                LOG IN
              </button>
              <div className='divider'></div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

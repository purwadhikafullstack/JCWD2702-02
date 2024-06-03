'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRegister } from './supports/hooks/useRegister'
import { registerSchema } from './supports/schema/userRegisterSchema'

export default function Register() {
  const { mutationRegister, dataRegister, isSuccess, isPending } = useRegister()

  return (
    <Formik
      initialValues={{
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={registerSchema}
      onSubmit={(values, { resetForm }) => {
        mutationRegister({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        if (isSuccess) resetForm()
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form>
            <div className='flex h-screen w-screen flex-col items-center justify-center gap-5'>
              {/* Name */}
              <label className='input input-bordered flex w-[300px] items-center gap-2'>
                Name
                <Field
                  name='fullname'
                  type='text'
                  className='grow'
                  placeholder='Fullname'
                />
              </label>
              <ErrorMessage
                name='fullname'
                component='div'
                className='text-red-500'
              />
              {/* Email */}
              <label className='input input-bordered flex w-[300px] items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-4 w-4 opacity-70'
                >
                  <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                  <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                </svg>
                <Field
                  name='email'
                  type='text'
                  className='grow'
                  placeholder='Email'
                />
              </label>
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500'
              />
              {/* Password */}
              <label className='input input-bordered flex w-[300px] items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-4 w-4 opacity-70'
                >
                  <path
                    fillRule='evenodd'
                    d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                    clipRule='evenodd'
                  />
                </svg>
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
              <label className='input input-bordered flex w-[300px] items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-4 w-4 opacity-70'
                >
                  <path
                    fillRule='evenodd'
                    d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                    clipRule='evenodd'
                  />
                </svg>
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
              <button
                type='submit'
                className='rounded-m btn bg-cerulean bg-eggplant hover:bg-hover_eggplant text-white'
                disabled={!(dirty && isValid) || isPending == true}
              >
                REGISTER
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

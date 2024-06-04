'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRegister } from '../../helpers/register/hooks/useRegister'
import { userRegisterSchema } from '../../helpers/register/schema/userRegisterSchema'
import { MdEmail, MdLock, MdPeople, MdLockOutline } from 'react-icons/md'

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
      validationSchema={userRegisterSchema}
      onSubmit={(values, { resetForm }) => {
        mutationRegister({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        resetForm()
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form>
            <div className='flex h-fit items-center justify-center p-[100px]'>
              <div className='flex h-[850px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
                <div className='flex flex-col gap-[25px]'>
                  <div className='text-[25px] font-bold'>
                    Register Your Account
                  </div>
                  <div className='text-[15px]'>
                    Already Have Account?{' '}
                    <a
                      href='/login'
                      className='text-eggplant hover:text-hover_eggplant underline underline-offset-2'
                    >
                      Login now
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
                      <ErrorMessage
                        name='fullname'
                        component='div'
                        className='text-red-500'
                      />
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
                    className='rounded-m btn bg-cerulean bg-eggplant hover:bg-hover_eggplant flex w-full justify-center text-white'
                    disabled={!(dirty && isValid) || isPending == true}
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

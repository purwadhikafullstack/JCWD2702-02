'use client'
import { useFormik } from 'formik'
import { adminLoginSchema } from '@/helpers/admin/schema/adminLoginSchema'
import { useAdminLogin } from '@/helpers/admin/hooks/useAdminLogin'
import { useEffect, useContext } from 'react'
import { UserContext } from '@/config/context/userContext'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: adminLoginSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      mutationLogin({ email: values.email, password: values.password })
    },
  })

  const { userData }: any = useContext(UserContext)
  const navigate = useRouter()
  const { mutationLogin, isSuccess, adminLoginData } = useAdminLogin()

  const loginData = adminLoginData?.data?.data

  useEffect(() => {
    if (isSuccess == true) {
      setTimeout(() => {
        if (userData.role == 1) {
          return navigate.push('/admin/warehouse')
        } else if (userData.role == 2) {
          return navigate.push(
            `/admin/warehouse/${loginData.warehouse}/dashboard`
          )
        }
      }, 1000)
    }
  }, [isSuccess, loginData])
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex min-h-screen w-full flex-col items-center justify-center gap-10'>
        <div className='flex w-[300px] flex-col items-center justify-center gap-5'>
          <div className='text-3xl text-eggplant font-medium'>Welcome, Admin!</div>
          <label
            className={`input input-bordered flex w-full items-center gap-2 ${formik.errors.email ? 'border-red-500' : ''}`}
          >
            <input
              type='text'
              className='grow'
              placeholder='Email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p className='text-red-500'>{formik.errors.email}</p>
          </label>
          <label
            className={`input input-bordered flex w-full items-center gap-2 ${formik.errors.password ? 'border-red-500' : ''}`}
          >
            <input
              type='password'
              className='grow'
              placeholder='Password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p className='text-red-500'>{formik.errors.password}</p>
          </label>
          <button
            type='submit'
            className='btn w-full border-eggplant bg-eggplant text-white hover:bg-hover_eggplant'
          // disabled={!(dirty && isValid) || status === 'pending'}
          >
            Log in
          </button>
        </div>
      </div>
    </form>
  )
}

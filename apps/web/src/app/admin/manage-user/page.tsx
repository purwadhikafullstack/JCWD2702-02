'use client'

import { useRouter } from 'next/navigation'
import { useGetAllUser } from '@/helpers/admin/hooks/getAllUser'
import { FiPlus } from 'react-icons/fi'
import { useCreateUser } from '@/helpers/admin/hooks/useCreateUser'
import { useFormik } from 'formik'
import { createUserSchema } from '@/helpers/admin/schema/createUserSchema'
import { useEffect } from 'react'

export default function ManageUser() {
  const navigate = useRouter()
  const { dataAllUser } = useGetAllUser()
  const { mutationCreateUser, isSuccess } = useCreateUser()

  const allUserData = dataAllUser?.data?.data

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },
    validationSchema: createUserSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values)
      mutationCreateUser({
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      })
    },
  })

  useEffect(() => {
    if (isSuccess) {
      location.reload()
    }
  }, [isSuccess])

  return (
    <div className='container mx-auto max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Manage User</div>
        <label
          htmlFor='my_modal_7'
          className='btn bg-eggplant text-white hover:bg-hover_eggplant'
        >
          <FiPlus /> Create New User
        </label>
        <input type='checkbox' id='my_modal_7' className='modal-toggle' />
        <div className='modal' role='dialog'>
          <div className='modal-box flex flex-col items-center justify-center gap-6'>
            <h3 className='text-lg font-bold'>Input User Data</h3>
            <form
              onSubmit={formik.handleSubmit}
              className='flex w-full flex-col items-center justify-center gap-6'
            >
              <label
                className={`input input-bordered flex w-full items-center gap-2`}
              >
                <input
                  type='text'
                  className='grow'
                  placeholder='Fullname'
                  name='fullname'
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                />
                <p className='text-red-500'>{formik.errors.fullname}</p>
              </label>
              <label
                className={`input input-bordered flex w-full items-center gap-2`}
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
                className={`input input-bordered flex w-full items-center gap-2`}
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
                className='rounded-m bg-azureBlue btn flex w-full justify-center bg-eggplant text-white hover:bg-hover_eggplant'
              >
                Add User
              </button>
            </form>
          </div>
          <label className='modal-backdrop' htmlFor='my_modal_7'>
            Close
          </label>
        </div>
      </div>
      <div className='flex h-[400px] w-full snap-y snap-mandatory flex-col gap-5 overflow-y-scroll p-10'>
        <div className='w-full overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr>
                <th></th>
                <th>Uid</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {allUserData?.map((x: any, i: any) => {
                return (
                  <tr
                    onClick={() =>
                      navigate.push(`/admin/manage-user/${x?.uid}`)
                    }
                    className='hover'
                    key={i}
                  >
                    <th>{i + 1}</th>
                    <td>{x?.uid}</td>
                    <td>{x?.fullname}</td>
                    <td>{x?.email}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

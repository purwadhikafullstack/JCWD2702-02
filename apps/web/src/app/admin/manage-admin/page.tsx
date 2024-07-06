'use client'

import { useRouter } from 'next/navigation'
import { useGetWarehouseAdmin } from '@/helpers/admin/hooks/getWarehouseAdmin'
import Loading from '@/components/cores/Loading'
import { FiPlus } from 'react-icons/fi'
import { createAdminSchema } from '@/helpers/admin/schema/createAdminSchema'
import { useFormik } from 'formik'
import { useCreateAdmin } from '@/helpers/admin/hooks/userCreateAdmin'
import { useEffect } from 'react'

export default function ManageAdmin() {
  const navigate = useRouter()

  const { mutationCreateAdmin, isSuccess } = useCreateAdmin()
  const { dataWarehouseAdmin, warehouseAdminLoading } = useGetWarehouseAdmin()

  const warehouseAdminData = dataWarehouseAdmin?.data?.data

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },
    validationSchema: createAdminSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      // console.log(values)
      mutationCreateAdmin({
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      })
    },
  })

  useEffect(() => {
    if (isSuccess) location.reload()
  })

  return (
    <div className='container mx-auto max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Manage Admin</div>
        <label
          htmlFor='my_modal_7'
          className='btn bg-eggplant text-white hover:bg-hover_eggplant'
        >
          <FiPlus /> Create New Admin
        </label>
        <input type='checkbox' id='my_modal_7' className='modal-toggle' />
        <div className='modal' role='dialog'>
          <div className='modal-box flex flex-col items-center justify-center gap-6'>
            <h3 className='text-lg font-bold'>Input Admin Data</h3>
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
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Uid</th>
                <th>Name</th>
                <th>Email</th>
                <th>Warehouse</th>
              </tr>
            </thead>
            <tbody>
              {warehouseAdminData?.map((x: any, i: any) => {
                return (
                  <tr
                    onClick={() =>
                      navigate.push(`/admin/manage-admin/${x?.uid}`)
                    }
                    className='hover'
                    key={i}
                  >
                    <th>{i + 1}</th>
                    <td>{x?.uid}</td>
                    <td>{x?.fullname}</td>
                    <td>{x?.email}</td>
                    <td>{x?.Warehouse?.name}</td>
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

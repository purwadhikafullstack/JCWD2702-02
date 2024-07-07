'use client'
import { getWarehouseAdminDetail } from '@/helpers/admin/hooks/getWarehouseAdminDetail'
import { getWarehouse } from '@/helpers/admin/hooks/getWarehouse'
import { useFormik } from 'formik'
import Loading from '@/components/cores/Loading'
import { useState, useEffect } from 'react'
import { useUpdateWarehouseAdmin } from '@/helpers/admin/hooks/useUpdateWarehouseAdmin'
import { useDeleteAdmin } from '@/helpers/admin/hooks/useDeleteAdmin'
import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from "react-icons/io"
import Link from "next/link"

export default function AdminDetail({
  params,
}: {
  params: { adminDetail: string }
}) {
  const navigate = useRouter()

  const { mutationDeleteAdmin, isSuccess } = useDeleteAdmin()

  const { dataWarehouseAdminDetail, warehouseAdminDetailLoading } =
    getWarehouseAdminDetail(params.adminDetail)

  const { dataWarehouse } = getWarehouse()

  const warehouseAdminData = dataWarehouseAdminDetail?.data?.data
  const warehouseData = dataWarehouse?.data?.data

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    warehouse: '',
  })

  const { mutationUpdateWarehouseAdmin } = useUpdateWarehouseAdmin()

  useEffect(() => {
    if (warehouseAdminData) {
      setInitialValues({
        name: warehouseAdminData?.fullname || '',
        email: warehouseAdminData?.email || '',
        warehouse: warehouseAdminData?.Warehouse?.id,
      })
    }
  }, [warehouseAdminData])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutationUpdateWarehouseAdmin({
        uid: params.adminDetail,
        name: values.name,
        email: values.email,
        warehouseId: Number(values.warehouse),
      })
    },
  })

  const handleWarehouseChange = (event: any) => {
    formik.setFieldValue('warehouse', event.target.value)
  }

  const handleDeleteAdmin = () => {
    mutationDeleteAdmin({
      userId: params.adminDetail,
    })
  }

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) navigate.push('/admin/manage-admin')
    }, 1000)
  })

  if (warehouseAdminDetailLoading) return <Loading></Loading>

  return (
    <div>
      <div className='container mx-auto flex max-h-[95vh] flex-col gap-5 overflow-y-auto rounded-md border border-transparent p-4 shadow-lg transition-all hover:border-gray-300'>
        <div>
          <div className='flex justify-between'>
            <div className='flex gap-4'></div>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              formik.handleSubmit(event)
            }}
          >
            <div className='flex flex-col gap-4'>
              <div className="text-sm breadcrumbs">
                <ul>
                  <li className="flex gap-2">
                    <Link className="hover:text-eggplant" href={`/admin/warehouse`}>
                      <IoIosArrowBack /> All Warehouse
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-eggplant" href={`/admin/manage-admin`}>
                      All Admins
                    </Link>
                  </li>
                  <li>{warehouseAdminData?.fullname}</li>
                </ul>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <input
                      className='rounded-t-md border-b border-transparent p-2 text-[40px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                      type='text'
                      name='name'
                      placeholder='Enter Here'
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='flex h-[40px] items-center justify-center rounded-md border-2 border-[#704b66] px-4 py-2 text-black transition-all hover:border-black hover:bg-[#704b66] hover:text-white'
                >
                  Update
                </button>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='description' className='mb-1 text-black'>
                  Email
                </label>
                <input
                  className='rounded-t-md border-b border-transparent p-2 text-[20px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                  type='text'
                  name='email'
                  placeholder='Enter Here'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='categoryId' className='mb-1 text-black'>
                  Warehouse
                </label>
                <select
                  name='warehouse'
                  className='select w-full text-[20px]'
                  onChange={handleWarehouseChange}
                  value={formik.values.warehouse}
                >
                  <option disabled={true}>Warehouse List</option>
                  {warehouseData?.map((x: any, i: any) => {
                    return (
                      <option key={i} value={x?.id}>
                        {x?.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </form>
          <div className='flex justify-end'>
            <button
              onClick={handleDeleteAdmin}
              className='mt-4 rounded-md border border-red-300 px-4 py-2 text-red-600 transition-colors hover:bg-red-100'
            >
              Erase Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

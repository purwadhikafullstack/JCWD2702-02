'use client'

import { useFormik } from 'formik'
import Loading from '@/components/cores/Loading'
import { useState, useEffect } from 'react'
import { getUserDetail } from '@/helpers/admin/hooks/getUserDetail'
import AddressBox from '@/components/cores/Dashboard/User/AddressBox'
import { useUpdateUserData } from '@/helpers/admin/hooks/useUpdateUserData'
import { useDeleteUser } from '@/helpers/admin/hooks/useDeleteUser'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'

export default function UserDetail({
  params,
}: {
  params: { adminDetail: string; userDetail: string }
}) {
  const navigate = useRouter()
  const { mutationDeleteUser, isSuccess } = useDeleteUser()

  const { mutationUpdateUserData } = useUpdateUserData()
  const { dataUserDetail, userDetailLoading } = getUserDetail(params.userDetail)

  const userDetailData = dataUserDetail?.data?.data
  const userAddressData = userDetailData?.Address

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    verify: '',
  })

  useEffect(() => {
    if (userDetailData) {
      setInitialValues({
        name: userDetailData?.fullname || '',
        email: userDetailData?.email || '',
        verify: userDetailData?.verify || '',
      })
    }
  }, [userDetailData])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutationUpdateUserData({
        userId: params.userDetail,
        fullname: values.name,
        email: values.email,
        verify: values.verify,
      })
    },
  })

  const handleVerifyChange = (event: any) => {
    formik.setFieldValue('verify', event.target.value)
  }

  const handleDeleteUser = () => {
    mutationDeleteUser({ userId: params.userDetail })
  }

  const notify = () => toast.success('Test Notification')

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) navigate.push('/admin/manage-user')
    }, 1000)
  }, [isSuccess])

  if (userDetailLoading) return <Loading></Loading>

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
                  Verification Status
                </label>
                <select
                  name='verify'
                  className='select w-full text-[20px]'
                  onChange={handleVerifyChange}
                  value={formik.values.verify}
                >
                  <option disabled={true}>Verification Status</option>
                  <option value={'UNVERIFY'}>UNVERIFY</option>
                  <option value={'VERIFIED'}>VERIFIED</option>
                </select>
              </div>
            </div>
          </form>
          <div className='flex flex-col gap-3'>
            <label htmlFor='user_address' className='mb-1 text-black'>
              User Address
            </label>
            <div className='container flex w-full rounded-xl border border-gray-300 shadow-lg hover:border-eggplant'>
              <div className='flex h-[400px] w-full snap-y snap-mandatory flex-col gap-5 overflow-y-scroll p-5'>
                {userAddressData?.map((x: any, i: any) => {
                  return (
                    <div key={i}>
                      <AddressBox
                        id={x?.id}
                        main={x?.main}
                        html={`address_${x?.id}`}
                        recipients={x?.recipients}
                        province={x?.province}
                        city={x?.city}
                        phoneNumber={x?.phoneNumber}
                        address={x?.address}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              onClick={handleDeleteUser}
              className='mt-4 rounded-md border border-red-300 px-4 py-2 text-red-600 transition-colors hover:bg-red-100'
            >
              Erase User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

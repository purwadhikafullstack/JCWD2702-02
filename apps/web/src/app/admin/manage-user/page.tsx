'use client'

import { useRouter } from 'next/navigation'
import { getAllUser } from '@/helpers/admin/hooks/getAllUser'
import { FiPlus } from 'react-icons/fi'

export default function ManageUser() {
  const navigate = useRouter()
  const { dataAllUser } = getAllUser()

  const allUserData = dataAllUser?.data?.data

  console.log(allUserData)

  return (
    <div className='container mx-auto max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Manage User</div>
        <label
          htmlFor='my_modal_7'
          className='btn bg-eggplant text-white hover:bg-hover_eggplant'
        >
          <FiPlus /> Create New Address
        </label>
        <input type='checkbox' id='my_modal_7' className='modal-toggle' />
        <div className='modal' role='dialog'>
          <div className='modal-box flex flex-col items-center justify-center gap-6'>
            <h3 className='text-lg font-bold'>Input User Data</h3>
            <label
              className={`input input-bordered flex w-full items-center gap-2`}
            >
              <input
                type='text'
                className='grow'
                placeholder='Fullname'
                name='fullname'
              />
            </label>
            <label
              className={`input input-bordered flex w-full items-center gap-2`}
            >
              <input
                type='text'
                className='grow'
                placeholder='Email'
                name='Email'
              />
            </label>
            <label
              className={`input input-bordered flex w-full items-center gap-2`}
            >
              <input
                type='password'
                className='grow'
                placeholder='Password'
                name='password'
              />
            </label>
            {/* <label
              className={`input input-bordered flex w-full items-center gap-2 ${formik.errors.recipients ? 'border-red-500' : ''}`}
            >
              <input
                type='text'
                className='grow'
                placeholder='Recipients'
                name='recipients'
                onChange={formik.handleChange}
                value={formik.values.recipients}
              />
              <p className='text-red-500'>{formik.errors.recipients}</p>
            </label>
            <label
              className={`input input-bordered flex w-full items-center gap-2 ${formik.errors.phoneNumber ? 'border-red-500' : ''}`}
            >
              <input
                type='text'
                className='grow'
                placeholder='Phone Number'
                name='phoneNumber'
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
              <p className='text-red-500'>{formik.errors.phoneNumber}</p>
            </label>
            <div className='w-full'>
              <select
                onChange={handleProvinceChange}
                defaultValue={'DEFAULT'}
                className={`select select-bordered w-full ${formik.errors.province ? 'border-red-500' : ''}`}
              >
                <option value={'DEFAULT'} disabled>
                  Provinsi
                </option>
                {provinceData?.map((x: any, i: any) => {
                  return (
                    <option
                      onClick={() => {
                        console.log('>>')
                      }}
                      key={i}
                      value={[x.province_id, x.province]}
                    >
                      {x.province}
                    </option>
                  )
                })}
              </select>
              <p className='mt-3 flex w-full justify-end text-red-500'>
                {formik.errors.province}
              </p>
            </div>
            <div className='w-full'>
              <select
                onChange={handleCityChange}
                defaultValue={'DEFAULT'}
                className={`select select-bordered w-full ${formik.errors.city ? 'border-red-500' : ''}`}
                disabled={!formik.values.provinceId || citiesLoading}
              >
                <option value={'DEFAULT'} disabled>
                  Kota
                </option>
                {citiesData?.map((x: any, i: any) => {
                  return (
                    <option key={i} value={[x.city_id, x.city_name]}>
                      {`${x.city_name} ${x.type}`}
                    </option>
                  )
                })}
              </select>
              <p className='mt-3 flex w-full justify-end text-red-500'>
                {formik.errors.city}
              </p>
            </div>
            <label
              className={`input input-bordered flex w-full items-center gap-2 ${formik.errors.address ? 'border-red-500' : ''}`}
            >
              <input
                type='text'
                className='grow'
                placeholder='Address'
                name='address'
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              <p className='text-red-500'>{formik.errors.address}</p>
            </label>
            <button
              type='submit'
              className='rounded-m bg-azureBlue btn flex w-full justify-center bg-eggplant text-white hover:bg-hover_eggplant'
              disabled={isLoading}
            >
              Add Address
            </button> */}
            <button
              type='submit'
              className='rounded-m bg-azureBlue btn flex w-full justify-center bg-eggplant text-white hover:bg-hover_eggplant'
            >
              Add User
            </button>
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
        {/* <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard /> */}
      </div>
    </div>
  )
}

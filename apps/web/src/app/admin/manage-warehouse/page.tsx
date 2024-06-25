'use client'

import { useRouter } from 'next/navigation'
import { getAllUser } from '@/helpers/admin/hooks/getAllUser'
import { FiPlus } from 'react-icons/fi'
import { useCreateUser } from '@/helpers/admin/hooks/useCreateUserAddress'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { getWarehouse } from '@/helpers/admin/hooks/getWarehouse'
import { createWarehouseSchema } from '@/helpers/admin/schema/createWarehouseSchema'
import { getProvince } from '@/helpers/rajaOngkir/hooks/getProvince'
import { getCities } from '@/helpers/rajaOngkir/hooks/getCities'
import { useCreateWarehouse } from '@/helpers/admin/hooks/useCreateWarehouse'

export default function ManageWarehouse() {
  const navigate = useRouter()
  const { dataAllUser } = getAllUser()
  const { mutationCreateWarehouse, isSuccess } = useCreateWarehouse()

  const { dataWarehouse } = getWarehouse()
  const warehouseData = dataWarehouse?.data?.data
  //   console.log(warehouseData)

  const { dataProvince } = getProvince()
  const provinceData = dataProvince?.data?.data

  const allUserData = dataAllUser?.data?.data

  const formik = useFormik({
    initialValues: {
      name: '',
      province: '',
      provinceId: '',
      city: '',
      cityId: '',
      detail: '',
      postalCode: '',
      longitude: '',
      latitude: '',
    },
    validationSchema: createWarehouseSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      mutationCreateWarehouse({
        name: values.name,
        province: values.province,
        provinceId: values.provinceId,
        city: values.city,
        cityId: values.cityId,
        detail: values.detail,
        postalCode: values.postalCode,
        longitude: values.longitude,
        latitude: values.latitude,
      })
    },
  })

  const { dataCities } = getCities(formik.values.provinceId)
  const citiesData = dataCities?.data?.data

  const handleProvinceChange = (event: any) => {
    const values = event.target.value.split(',')
    formik.setFieldValue('provinceId', values[0])
    formik.setFieldValue('province', values[1])
  }

  const handleCityChange = (event: any) => {
    const values = event.target.value.split(',')

    formik.setFieldValue('cityId', values[0])
    formik.setFieldValue('city', values[1])
  }

  //   console.log(formik.values)

  useEffect(() => {
    if (isSuccess) {
      location.reload()
    }
  }, [isSuccess])

  return (
    <div className='container mx-auto max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Manage Warehouse</div>
        <label
          htmlFor='my_modal_7'
          className='btn bg-eggplant text-white hover:bg-hover_eggplant'
        >
          <FiPlus /> Create New Warehouse
        </label>
        <input type='checkbox' id='my_modal_7' className='modal-toggle' />
        <div className='modal' role='dialog'>
          <div className='modal-box flex flex-col items-center justify-center gap-6'>
            <h3 className='text-lg font-bold'>Input Warehouse Data</h3>
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
                  placeholder='Warehouse Name'
                  name='name'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <p className='text-red-500'>{formik.errors.name}</p>
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
                  value={`${formik.values.cityId},${formik.values.city}`}
                  className={`select select-bordered w-full ${formik.errors.city ? 'border-red-500' : ''}`}
                  disabled={!formik.values.provinceId}
                >
                  <option value={'DEFAULT'} disabled>
                    Kota
                  </option>
                  {citiesData?.map((x: any, i: any) => (
                    <option key={i} value={`${x.city_id},${x.city_name}`}>
                      {`${x.city_name} ${x.type}`}
                    </option>
                  ))}
                </select>
                <p className='mt-3 flex w-full justify-end text-red-500'>
                  {formik.errors.city}
                </p>
              </div>
              <label
                className={`input input-bordered flex w-full items-center gap-2`}
              >
                <input
                  type='text'
                  className='grow'
                  placeholder='Detail Address'
                  name='detail'
                  onChange={formik.handleChange}
                  value={formik.values.detail}
                />
                <p className='text-red-500'>{formik.errors.detail}</p>
              </label>
              <label
                className={`input input-bordered flex w-full items-center gap-2`}
              >
                <input
                  type='text'
                  className='grow'
                  placeholder='Postal Code'
                  name='postalCode'
                  onChange={formik.handleChange}
                  value={formik.values.postalCode}
                />
                <p className='text-red-500'>{formik.errors.postalCode}</p>
              </label>
              <label
                className={`input input-bordered flex w-full items-center gap-2`}
              >
                <input
                  type='text'
                  className='grow'
                  placeholder='Longitude'
                  name='longitude'
                  onChange={formik.handleChange}
                  value={formik.values.longitude}
                />
                <p className='text-red-500'>{formik.errors.longitude}</p>
              </label>
              <label
                className={`input input-bordered flex w-full items-center gap-2`}
              >
                <input
                  type='text'
                  className='grow'
                  placeholder='Latitude'
                  name='latitude'
                  onChange={formik.handleChange}
                  value={formik.values.latitude}
                />
                <p className='text-red-500'>{formik.errors.latitude}</p>
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
                <th>Name</th>
                <th>Province</th>
                <th>City</th>
                <th>Detail</th>
                <th>Postal Code</th>
              </tr>
            </thead>
            <tbody>
              {warehouseData?.map((x: any, i: any) => {
                return (
                  <tr
                    onClick={() =>
                      navigate.push(`/admin/manage-warehouse/${x?.id}`)
                    }
                    className='hover'
                    key={i}
                  >
                    <th>{x?.id}</th>
                    <td>{x?.name}</td>
                    <td>{x?.province}</td>
                    <td>{x?.city}</td>
                    <td>{x?.detail}</td>
                    <td>{x?.postalCode}</td>
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

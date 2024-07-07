'use client'
import { useFormik } from 'formik'
import Loading from '@/components/cores/Loading'
import { useState, useEffect } from 'react'
import { useGetWarehouseDetail } from '@/helpers/admin/hooks/getWarehouseDetail'
import { createWarehouseSchema } from '@/helpers/admin/schema/createWarehouseSchema'
import { useGetProvince } from '@/helpers/rajaOngkir/hooks/getProvince'
import { useGetCities } from '@/helpers/rajaOngkir/hooks/getCities'
import { useUpdateWarehouseDetail } from '@/helpers/admin/hooks/useUpdateWarehouseDetail'
import { IoIosArrowBack } from "react-icons/io"
import Link from "next/link";

export default function UserDetail({
  params,
}: {
  params: { warehouseDetail: string }
}) {
  const { mutationUpdateWarehouse, isSuccess } = useUpdateWarehouseDetail()

  const { dataWarehouseDetail, warehouseDetailLoading } = useGetWarehouseDetail(
    params.warehouseDetail
  )
  const warehouseDetailData = dataWarehouseDetail?.data?.data

  const { dataProvince } = useGetProvince()
  const provinceData = dataProvince?.data?.data

  const [initialValues, setInitialValues] = useState({
    name: '',
    province: '',
    provinceId: '',
    city: '',
    cityId: '',
    detail: '',
    postalCode: '',
    longitude: '',
    latitude: '',
  })

  useEffect(() => {
    if (warehouseDetailData) {
      setInitialValues({
        name: warehouseDetailData?.name || '',
        province: warehouseDetailData?.province || '',
        provinceId: warehouseDetailData?.provinceId || '',
        city: warehouseDetailData?.city || '',
        cityId: warehouseDetailData?.cityId || '',
        detail: warehouseDetailData?.detail || '',
        postalCode: warehouseDetailData?.postalCode || '',
        longitude: warehouseDetailData?.longitude || '',
        latitude: warehouseDetailData?.latitude || '',
      })
    }
  }, [warehouseDetailData])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: createWarehouseSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      mutationUpdateWarehouse({
        id: params.warehouseDetail,
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

  const { dataCities } = useGetCities(formik.values.provinceId)
  const citiesData = dataCities?.data?.data

  const handleProvinceChange = (event: any) => {
    const values = event.target.value.split(',')
    formik.setFieldValue('provinceId', values[0])
    formik.setFieldValue('province', values[1])
    formik.setFieldValue('cityId', '')
    formik.setFieldValue('city', '')
  }

  const handleCityChange = (event: any) => {
    const values = event.target.value.split(',')
    formik.setFieldValue('cityId', values[0])
    formik.setFieldValue('city', values[1])
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        location.reload()
      }, 1000)
    }
  }, [isSuccess])

  if (warehouseDetailLoading) return <Loading />

  return (
    <div>
      <div className='container mx-auto flex max-h-[95vh] flex-col gap-5 overflow-y-auto rounded-md border border-transparent p-4 shadow-lg transition-all hover:border-gray-300'>
        <div>
          <div className="text-sm breadcrumbs">
            <ul>
              <li className="flex gap-2">
                <Link className="hover:text-eggplant" href={`/admin/warehouse`}>
                  <IoIosArrowBack /> All Warehouse
                </Link>
              </li>
              <li>
                <Link className="hover:text-eggplant" href={`/admin/manage-warehouse`}>
                  All Warehouses
                </Link>
              </li>
              <li>{warehouseDetailData?.name}</li>
            </ul>
          </div>
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
                  <p className='text-red-500'>{formik.errors.name}</p>
                </div>
                <button
                  type='submit'
                  className='flex h-[40px] items-center justify-center rounded-md border-2 border-[#704b66] px-4 py-2 text-black transition-all hover:border-black hover:bg-[#704b66] hover:text-white'
                  disabled={!formik.dirty || formik.isSubmitting}
                >
                  Update
                </button>
              </div>
              <div className='flex w-full flex-col gap-3'>
                <label htmlFor='categoryId' className='mb-1 text-black'>
                  Province
                </label>
                <select
                  onChange={handleProvinceChange}
                  value={`${formik.values.provinceId},${formik.values.province}`}
                  className={`select select-bordered w-full ${formik.errors.province ? 'border-red-500' : ''}`}
                >
                  <option value='DEFAULT' disabled>
                    Provinsi
                  </option>
                  {provinceData?.map((x: any, i: any) => (
                    <option key={i} value={`${x.province_id},${x.province}`}>
                      {x.province}
                    </option>
                  ))}
                </select>
                <p className='mt-3 flex w-full justify-end text-red-500'>
                  {formik.errors.province}
                </p>
              </div>
              <div className='flex w-full flex-col gap-3'>
                <label htmlFor='categoryId' className='mb-1 text-black'>
                  City
                </label>
                <select
                  onChange={handleCityChange}
                  value={`${formik.values.cityId},${formik.values.city}`}
                  className={`select select-bordered w-full ${formik.errors.city ? 'border-red-500' : ''}`}
                  disabled={!formik.values.provinceId}
                >
                  <option value='DEFAULT' disabled>
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
              <div className='flex flex-col'>
                <label htmlFor='description' className='mb-1 text-black'>
                  Detail Address
                </label>
                <input
                  className='rounded-t-md border-b border-transparent p-2 text-[20px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                  type='text'
                  name='detail'
                  placeholder='Enter Here'
                  onChange={formik.handleChange}
                  value={formik.values.detail}
                />
                <p className='text-red-500'>{formik.errors.detail}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='description' className='mb-1 text-black'>
                  Postal Code
                </label>
                <input
                  className='rounded-t-md border-b border-transparent p-2 text-[20px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                  type='text'
                  name='postalCode'
                  placeholder='Enter Here'
                  onChange={formik.handleChange}
                  value={formik.values.postalCode}
                />
                <p className='text-red-500'>{formik.errors.postalCode}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='description' className='mb-1 text-black'>
                  Postal Code
                </label>
                <input
                  className='rounded-t-md border-b border-transparent p-2 text-[20px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                  type='text'
                  name='longitude'
                  placeholder='Enter Here'
                  onChange={formik.handleChange}
                  value={formik.values.longitude}
                />
                <p className='text-red-500'>{formik.errors.longitude}</p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='description' className='mb-1 text-black'>
                  Postal Code
                </label>
                <input
                  className='rounded-t-md border-b border-transparent p-2 text-[20px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                  type='text'
                  name='latitude'
                  placeholder='Enter Here'
                  onChange={formik.handleChange}
                  value={formik.values.latitude}
                />
                <p className='text-red-500'>{formik.errors.latitude}</p>
              </div>
            </div>
          </form>
          <div className='flex justify-end'>
            <button className='mt-4 rounded-md border border-red-300 px-4 py-2 text-red-600 transition-colors hover:bg-red-100'>
              Erase
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

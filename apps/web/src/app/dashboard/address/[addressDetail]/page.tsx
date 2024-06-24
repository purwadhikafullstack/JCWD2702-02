'use client'

import { useFormik } from 'formik'
import Loading from '@/components/cores/Loading'
import { useState, useEffect } from 'react'
import { createUserAddressSchema } from '@/helpers/address/schema/createUserAddressSchema'
import { getAddressDetail } from '@/helpers/address/hooks/getAddressDetail'
import { getProvince } from '@/helpers/rajaOngkir/hooks/getProvince'
import { getCities } from '@/helpers/rajaOngkir/hooks/getCities'
import { useUpdateAddress } from '@/helpers/address/hooks/useUpdateAddress'
import { getCityDetailed } from '@/helpers/rajaOngkir/hooks/getCityDetailed'
import axios from 'axios'

interface ILocation {
  lat: number
  lng: number
}

export default function AddressDetail({
  params,
}: {
  params: { adminDetail: string; userDetail: string; addressDetail: string }
}) {
  const { mutationUpdateAddress, isSuccess } = useUpdateAddress()
  const { dataAddressDetail, addressDetailLoading } = getAddressDetail(
    params.addressDetail
  )

  const { dataProvince } = getProvince()
  const provinceData = dataProvince?.data?.data

  const addressDetailData = dataAddressDetail?.data?.data

  const [initialValues, setInitialValues] = useState({
    recipients: '',
    address: '',
    phoneNumber: '',
    province: '',
    provinceId: '',
    city: '',
    cityId: '',
  })

  useEffect(() => {
    if (addressDetailData) {
      setInitialValues({
        recipients: addressDetailData?.recipients,
        address: addressDetailData?.address,
        phoneNumber: addressDetailData?.phoneNumber,
        province: addressDetailData?.province,
        provinceId: addressDetailData?.provinceId,
        city: addressDetailData?.city,
        cityId: addressDetailData?.cityId,
      })
    }
  }, [addressDetailData])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: createUserAddressSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      mutationUpdateAddress({
        addressId: params.addressDetail,
        recipients: values.recipients,
        address: values.address,
        phoneNumber: values.phoneNumber,
        province: values.province,
        provinceId: Number(values.provinceId),
        city: values.city,
        cityId: Number(values.cityId),
        postalCode: detailedCityData?.postal_code,
        longitude: cityLocation?.lng.toString() as any,
        latitude: cityLocation?.lat.toString() as any,
      })
      //   alert('test')
      //   location.reload()
    },
  })

  const { dataCities } = getCities(formik.values.provinceId)
  const citiesData = dataCities?.data?.data

  const { dataDetailedCity } = getCityDetailed(
    formik.values.provinceId,
    formik.values.cityId
  )

  const detailedCityData = dataDetailedCity?.data?.data

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

  const [cityLocation, setCityLocation] = useState<ILocation | null>(null)
  const [isLoading, setIsLoading] = useState<any>(true)

  const handleSearch = async () => {
    setIsLoading(true)
    const apiKey = '3ddb953b42144d3c9b1986e546497e69'
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(formik.values.city)}&key=${apiKey}`
      )
      const { lat, lng } = response.data.results[0].geometry
      setCityLocation({ lat, lng })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [formik.values.city])

  if (addressDetailLoading) return <Loading></Loading>

  if (isSuccess) {
    setTimeout(() => {
      location.reload()
    }, 1000)
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='container mx-auto flex max-h-[100vh] flex-col gap-5 overflow-y-auto rounded-md border border-transparent p-4 shadow-lg transition-all hover:border-eggplant'>
        <div>
          <div className='flex w-full justify-center'>
            <h1 className='flex gap-4'>Update Address</h1>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              formik.handleSubmit(event)
            }}
          >
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-end'>
                <button
                  type='submit'
                  className='flex h-[40px] items-center justify-center rounded-md border-2 border-[#704b66] px-4 py-2 text-black transition-all hover:border-black hover:bg-[#704b66] hover:text-white'
                  disabled={!formik.dirty || formik.isSubmitting || isLoading}
                >
                  Update
                </button>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='description' className='mb-1 text-black'>
                  Recipients
                </label>
                <input
                  className='rounded-t-md border-b border-transparent p-2 text-[20px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                  type='text'
                  name='recipients'
                  placeholder='Enter Here'
                  onChange={formik.handleChange}
                  value={formik.values.recipients}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='description' className='mb-1 text-black'>
                  Phone Number
                </label>
                <input
                  className='rounded-t-md border-b border-transparent p-2 text-[20px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                  type='text'
                  name='phoneNumber'
                  placeholder='Enter Here'
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
              </div>
              <div className='w-full'>
                <select
                  onChange={handleProvinceChange}
                  value={`${formik.values.provinceId},${formik.values.province}`}
                  className={`select select-bordered w-full ${formik.errors.province ? 'border-red-500' : ''}`}
                >
                  <option value={'DEFAULT'} disabled>
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
              <div className='flex flex-col'>
                <label htmlFor='description' className='mb-1 text-black'>
                  Address
                </label>
                <input
                  className='rounded-t-md border-b border-transparent p-2 text-[20px] transition-all hover:border-gray-300 focus:border-b-2 focus:border-[#704b66] focus:outline-none'
                  type='text'
                  name='address'
                  placeholder='Enter Here'
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

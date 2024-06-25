import AddressBox from './AddressBox'
import { FiPlus } from 'react-icons/fi'
import { getProvince } from '@/helpers/rajaOngkir/hooks/getProvince'
import { getCities } from '@/helpers/rajaOngkir/hooks/getCities'
import { getCityDetailed } from '@/helpers/rajaOngkir/hooks/getCityDetailed'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCreateUserAddress } from '@/helpers/address/hooks/useCreateUserAddress'
import { useFormik } from 'formik'
import { createUserAddressSchema } from '@/helpers/address/schema/createUserAddressSchema'
import { getUserAddress } from './../../../../helpers/address/hooks/getUserAddress'

interface ILocation {
  lat: number
  lng: number
}

export default function UserAddress() {
  const formik = useFormik({
    initialValues: {
      recipients: '',
      address: '',
      phoneNumber: '',
      province: '',
      provinceId: '',
      city: '',
      cityId: '',
    },
    validationSchema: createUserAddressSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      mutationCreateAddress({
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
    },
  })

  const { mutationCreateAddress, isSuccess } = useCreateUserAddress()
  const { dataUserAddress, UserAddressLoading } = getUserAddress()

  const userAddressData = dataUserAddress?.data?.data

  const { dataProvince } = getProvince()
  const provinceData = dataProvince?.data?.data

  const handleProvinceChange = (event: any) => {
    const values = event.target.value.split(',')
    formik.setFieldValue('provinceId', values[0])
    formik.setFieldValue('province', values[1])
  }

  const { dataCities, citiesLoading } = getCities(formik.values.provinceId)
  const citiesData = dataCities?.data?.data

  const handleCityChange = (event: any) => {
    const values = event.target.value.split(',')

    formik.setFieldValue('cityId', values[0])
    formik.setFieldValue('city', values[1])
  }

  const { dataDetailedCity } = getCityDetailed(
    formik.values.provinceId,
    formik.values.cityId
  )

  const detailedCityData = dataDetailedCity?.data?.data

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

  useEffect(() => {
    if (isSuccess) formik.resetForm()
  }, [isSuccess])

  return (
    <div className='flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md'>
      <div className='flex w-full flex-col items-center justify-center gap-3'>
        <div className='flex w-[70%] items-center justify-center rounded-md bg-eggplant text-white'></div>
      </div>
      <div className='flex w-full items-center justify-between'>
        <div className='flex text-xl font-bold'>User Address</div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor='my_modal_7'
              className='btn bg-eggplant text-white hover:bg-hover_eggplant'
            >
              <FiPlus /> Create New Address
            </label>
            <input type='checkbox' id='my_modal_7' className='modal-toggle' />
            <div className='modal' role='dialog'>
              <div className='modal-box flex flex-col items-center justify-center gap-6'>
                <h3 className='text-lg font-bold'>Input Your Address Data </h3>
                <label
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
                </button>
              </div>
              <label className='modal-backdrop' htmlFor='my_modal_7'>
                Close
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className='divider w-full'></div>
      <div className='flex w-full'>
        <div className='flex h-[400px] w-full snap-y snap-mandatory flex-col gap-5 overflow-y-scroll p-10'>
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
  )
}

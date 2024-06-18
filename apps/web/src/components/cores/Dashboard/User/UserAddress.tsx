import AddressBox from './AddressBox'
import { FiPlus } from 'react-icons/fi'
import { getProvince } from '@/helpers/rajaOngkir/hooks/getProvince'
import { getCities } from '@/helpers/rajaOngkir/hooks/getCities'
import { getCityDetailed } from '@/helpers/rajaOngkir/hooks/getCityDetailed'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './../../../../components/cores/Loading'
import { useCreateUserAddress } from '@/helpers/address/hooks/useCreateUserAddress'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import { createUserAddressSchema } from '@/helpers/address/schema/createUserAddressSchema'
import { useRouter } from 'next/navigation'
import { IoMdClose } from 'react-icons/io'

interface ILocation {
  lat: number
  lng: number
}

export default function UserAddress() {
  const navigate = useRouter()
  const { mutationCreateAddress } = useCreateUserAddress()

  const { dataProvince, provinceLoading } = getProvince()
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedProvinceName, setSelectedProvinceName] = useState('')
  const provinceData = dataProvince?.data?.data

  const handleProvinceChange = (event: any) => {
    const values = event.target.value.split(',')
    setSelectedProvince(values[0])
    setSelectedProvinceName(values[1])
  }

  const { dataCities, citiesLoading } = getCities(selectedProvince)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCityName, setSelectedCityName] = useState('Indonesia')
  const citiesData = dataCities?.data?.data

  const handleCityChange = (event: any) => {
    const values = event.target.value.split(',')

    setSelectedCity(values[0])
    setSelectedCityName(values[1])
  }

  const { dataDetailedCity, detailedCityLoading } = getCityDetailed(
    selectedProvince,
    selectedCity
  )
  const [detailCityName, setDetailCityName] = useState('')
  const detailedCityData = dataDetailedCity?.data?.data

  const [cityLocation, setCityLocation] = useState<ILocation | null>(null)
  const [isLoading, setIsLoading] = useState<any>(false)

  const handleSearch = async () => {
    setIsLoading(true)
    const apiKey = '3ddb953b42144d3c9b1986e546497e69'
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(selectedCityName)}&key=${apiKey}`
      )
      const { lat, lng } = response.data.results[0].geometry
      setCityLocation({ lat, lng })
      setIsLoading(false)
    } catch (error) {
      // console.error('Error fetching geocoding data:', error)
      console.log('')
    }
  }

  useEffect(() => {
    handleSearch()
  }, [selectedCity])

  return (
    <Formik
      initialValues={{
        recipients: '',
        address: '',
        phoneNumber: '',
      }}
      validationSchema={createUserAddressSchema}
      onSubmit={(values) => {
        mutationCreateAddress({
          recipients: values.recipients,
          address: values.address,
          phoneNumber: values.phoneNumber,
          province: selectedProvinceName,
          provinceId: Number(selectedProvince),
          city: selectedCityName,
          cityId: Number(selectedCity),
          postalCode: detailedCityData?.postal_code,
          longitude: cityLocation?.lng.toString() as any,
          latitude: cityLocation?.lat.toString() as any,
        })
        // location.reload()
      }}
    >
      {({ dirty, isValid }) => {
        return (
          <Form>
            <div className='flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md'>
              <div className='flex w-full flex-col items-center justify-center gap-3'>
                <div className='flex w-[70%] items-center justify-center rounded-md bg-eggplant text-white'></div>
              </div>
              <div className='flex w-full items-center justify-between'>
                <div className='flex text-xl font-bold'>User Address</div>
                <div>
                  <label
                    htmlFor='my_modal_7'
                    className='btn bg-eggplant text-white'
                  >
                    <FiPlus /> Create New Address
                  </label>
                  <input
                    type='checkbox'
                    id='my_modal_7'
                    className='modal-toggle'
                  />
                  <div className='modal' role='dialog'>
                    <div className='modal-box flex flex-col items-center justify-center gap-6'>
                      <h3 className='text-lg font-bold'>
                        Input Your Address Data{' '}
                      </h3>
                      <p>Click outside the box to close</p>
                      <label className='input input-bordered flex w-full items-center gap-2'>
                        <Field
                          type='text'
                          className='grow'
                          placeholder='Recipients'
                          name='recipients'
                        />
                      </label>
                      <ErrorMessage
                        name='recipients'
                        component='div'
                        className='text-red-500'
                      />

                      <label className='input input-bordered flex w-full items-center gap-2'>
                        <Field
                          type='text'
                          className='grow'
                          placeholder='Phone Number'
                          name='phoneNumber'
                        />
                      </label>
                      <select
                        onChange={handleProvinceChange}
                        defaultValue={'DEFAULT'}
                        className='select select-bordered w-full'
                      >
                        <option value={'DEFAULT'} disabled selected>
                          Provinsi
                        </option>
                        {provinceData?.map((x: any, i: any) => {
                          return (
                            <option key={i} value={[x.province_id, x.province]}>
                              {x.province}
                            </option>
                          )
                        })}
                      </select>
                      <select
                        onChange={handleCityChange}
                        defaultValue={'DEFAULT'}
                        className='select select-bordered w-full'
                        disabled={!selectedProvince || citiesLoading}
                      >
                        <option value={'DEFAULT'} disabled selected>
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
                      <label className='input input-bordered flex w-full items-center gap-2'>
                        <Field
                          type='text'
                          className='grow'
                          placeholder='Address'
                          name='address'
                        />
                      </label>
                      {/* <div className='modal-action absolute right-0 top-0'>
                        <label
                          htmlFor='my_modal_7'
                          className='btn bg-eggplant text-white hover:bg-hover_eggplant'
                        >
                          <IoMdClose />
                        </label>
                      </div> */}
                      <button
                        type='submit'
                        className='rounded-m bg-azureBlue btn flex w-full justify-center bg-eggplant text-white hover:bg-hover_eggplant'
                        disabled={!(dirty && isValid) || isLoading == true}
                      >
                        Add Address
                      </button>
                    </div>
                    <label className='modal-backdrop' htmlFor='my_modal_7'>
                      Close
                    </label>
                  </div>
                </div>
              </div>
              <div className='divider w-full'></div>
              <div className='flex w-full'>
                <div className='flex w-full flex-col gap-2'>
                  <AddressBox />
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

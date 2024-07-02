'use client'

import { getUserAddress } from '@/helpers/address/hooks/getUserAddress'
import { getCheckoutCart } from '@/helpers/cart/hooks/getCheckoutCart'
import { useEffect, useState, useRef } from 'react'
import Loading from '@/components/cores/Loading'
import { getUserCart } from '@/helpers/cart/hooks/getUserCart'
import { getAddressDetail } from '@/helpers/address/hooks/getAddressDetail'
import SelectedCart from '@/components/cart/SelectedCart'
import { useGetNearestWarehouse } from '@/helpers/cart/hooks/useGetNearestWarehouse'
import { useShippingCost } from '@/helpers/rajaOngkir/hooks/useShippingCost'
import { useCheckoutMidtrans } from '@/helpers/checkout/hooks/useCheckoutMidtrans'

export default function Checkout() {
  const { dataUserAddress, UserAddressLoading } = getUserAddress()
  const { dataCheckoutCart, checkoutCartLoading } = getCheckoutCart()
  const { dataUserCart } = getUserCart()
  const { mutationGetNearestWarehouse, nearestWarehouseData } =
    useGetNearestWarehouse()
  const { mutationShippingCost, shippingCostData } = useShippingCost()
  const { mutationCheckoutMidtrans } = useCheckoutMidtrans()

  const selectedCart = dataCheckoutCart?.data?.data
  const totalWeight = dataUserCart?.data?.data?.totalWeight

  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [courier, setCourier]: any = useState()
  const [shippingCost, setShippingCost]: any = useState()
  const [shippingCostPrice, setShippingCostPrice] = useState<number>()
  const [etd, setEtd]: any = useState()
  const [totalAmount, setTotalAmout] = useState<number>()

  const courierTypeRef = useRef<HTMLSelectElement>(null)
  const addressTypeRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (totalPrice && shippingCostPrice) {
      setTotalAmout(totalPrice + shippingCostPrice)
    }
  })

  useEffect(() => {
    if (dataUserCart?.data?.data?.totalPrice) {
      setTotalPrice(dataUserCart?.data?.data?.totalPrice)
    }
  }, [dataUserCart])

  const userAddressData = dataUserAddress?.data?.data

  const [mainAddress, setMainAddress] = useState(null)

  useEffect(() => {
    mutationGetNearestWarehouse(Number(mainAddress))
  }, [mainAddress])

  useEffect(() => {
    if (shippingCostData) setShippingCost(shippingCostData?.data?.data)
  }, [shippingCostData])

  const nearestWarehouse = nearestWarehouseData?.data?.data?.nearestPlace

  const handleAddressChange = (event: any) => {
    setMainAddress(event.target.value)
    setShippingCostPrice(undefined)
    setTotalAmout(undefined)
    setEtd(undefined)
    setCourier(undefined)
    if (addressTypeRef.current) {
      addressTypeRef.current.value = 'DEFAULT'
    }
  }

  const handleCourierChange = (event: any) => {
    setShippingCostPrice(undefined)
    setCourier(event.target.value)
    setTotalAmout(undefined)
    setEtd(undefined)
    if (courierTypeRef.current) {
      courierTypeRef.current.value = 'DEFAULT'
    }
  }

  const handleShippingCostprice = (event: any) => {
    const values = event.target.value.split(',')
    setShippingCostPrice(Number(values[0]))
    setEtd(values[1])
  }

  const { dataAddressDetail } = getAddressDetail(mainAddress as any)
  const addressDetailData = dataAddressDetail?.data?.data

  const handleCheckoutMidtrans = () => {
    mutationCheckoutMidtrans({
      grossAmount: Number(totalAmount),
      shippingCost: shippingCostPrice as number,
      addressId: Number(mainAddress),
    })
  }

  useEffect(() => {
    mutationShippingCost({
      origin: addressDetailData?.cityId,
      destination: nearestWarehouse?.cityId,
      weight: Number(totalWeight),
      courier: courier as any,
    })
  }, [courier])

  if (UserAddressLoading || checkoutCartLoading) return <Loading />

  return (
    <div className='flex h-full flex-col items-center justify-center gap-3 px-20'>
      <h1 className='flex w-full justify-center text-2xl font-bold'>
        Checkout
      </h1>
      <div className='flex w-[80%] justify-center rounded-lg bg-ebony'>
        <div className='flex min-h-[410px] w-full'>
          <div className='flex h-max w-full flex-col items-center justify-center gap-10 p-5'>
            <div className='flex w-full flex-col gap-3'>
              <h3 className='text-xl font-bold text-white'>Choose Address</h3>
              <select
                defaultValue={'DEFAULT'}
                className='select select-bordered w-full'
                onChange={handleAddressChange}
              >
                <option value={'DEFAULT'} disabled>
                  Choose Your Address
                </option>
                {userAddressData?.map((x: any, i: any) => {
                  return (
                    <option key={i} value={x?.id}>
                      {x?.address}
                    </option>
                  )
                })}
              </select>
            </div>
            {mainAddress == null ? (
              <div className='flex h-[200px] items-center justify-center font-bold text-white'>
                Choose Address First
              </div>
            ) : (
              <>
                <div className='flex w-full flex-col gap-2 text-white'>
                  <h3 className='text-xl font-bold'>Address Detail</h3>
                  <div className='flex w-full justify-between text-mercury'>
                    <div className='font-bold'>Recipients</div>
                    {addressDetailData?.recipients}
                  </div>
                  <div className='flex h-fit w-full justify-between text-mercury'>
                    <div className='font-bold'>Address</div>
                    {addressDetailData?.address}
                  </div>
                  <div className='flex w-full justify-between text-mercury'>
                    <div className='font-bold'>Phone Number</div>
                    {addressDetailData?.phoneNumber}
                  </div>
                  <div className='flex w-full justify-between text-mercury'>
                    <div className='font-bold'>Province</div>
                    {addressDetailData?.province}
                  </div>
                  <div className='flex w-full justify-between text-mercury'>
                    <div className='font-bold'>City</div>
                    {addressDetailData?.city}
                  </div>
                </div>
              </>
            )}

            <div className='flex w-full flex-col gap-3'>
              <h3 className='text-xl font-bold text-white'>Choose Shipping</h3>
              <div className='flex w-full'>
                <div className='flex w-[50%] flex-col gap-3'>
                  <select
                    ref={addressTypeRef}
                    onChange={handleCourierChange}
                    defaultValue={'DEFAULT'}
                    className='select select-bordered w-[50%]'
                    disabled={!mainAddress}
                  >
                    <option value={'DEFAULT'} disabled>
                      Courier
                    </option>
                    <option value={'jne'}>JNE</option>
                    <option value={'pos'}>POS</option>
                    <option value={'tiki'}>TIKI</option>
                  </select>
                </div>
                <div className='flex w-[50%] flex-col gap-3'>
                  <select
                    ref={courierTypeRef}
                    defaultValue={'DEFAULT'}
                    onChange={handleShippingCostprice}
                    className='select select-bordered w-[50%]'
                    disabled={!courier}
                  >
                    <option value={'DEFAULT'} disabled>
                      Courier Type
                    </option>
                    {shippingCost?.map((x: any, i: any) => {
                      return (
                        <option
                          key={i}
                          value={[x?.cost[0].value, x?.cost[0].etd]}
                        >
                          {x?.service}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className='flex w-full'>
              <div className='flex h-[200px] w-full snap-y snap-mandatory flex-col gap-5 overflow-y-scroll p-10'>
                {selectedCart?.map((x: any, i: any) => {
                  return (
                    <div key={i}>
                      <SelectedCart id={x?.id} productId={x?.productId} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='flex h-full w-full rounded-r-lg bg-eggplant'>
          <div className='flex h-full w-full flex-col items-center justify-start gap-2 p-5 text-white'>
            <div className='text-2xl font-bold text-white'>
              Checkout Information
            </div>
            <div className='text-md flex w-full justify-between text-mercury'>
              <div>Total Price</div>
              {totalPrice.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
            {shippingCostPrice ? (
              <div className='text-md flex w-full justify-between text-mercury'>
                <div>Shipping Price</div>
                {shippingCostPrice.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </div>
            ) : null}
            {etd ? (
              <div className='text-md flex w-full justify-between text-mercury'>
                <div>Estimate Day</div>
                {etd} Day/s
              </div>
            ) : null}
            {totalAmount ? (
              <>
                <div className='divider'></div>
                <div className='text-md flex w-full justify-between text-mercury'>
                  <div>Total Payment</div>
                  {totalAmount.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </div>
                <div className='divider text-neutral-content'></div>
              </>
            ) : null}
            {totalAmount ? (
              <div
                onClick={handleCheckoutMidtrans}
                className='text-md btn flex w-[20%] justify-center border-ebony bg-ebony text-mercury hover:border-eggplant hover:bg-ebony'
              >
                Checkout
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

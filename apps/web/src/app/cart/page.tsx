'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useCartStore from '@/zustand/cart/cartStore'
import { getUserCart } from '@/helpers/cart/hooks/getUserCart'
import Cart from '@/components/cart'
import { getCartDetail } from '@/helpers/cart/hooks/getCartDetail'
import { useSelectAll } from '@/helpers/cart/hooks/useSelectAll'

const CartPage: React.FC = () => {
  const { mutationSelectedAll, isSuccess } = useSelectAll()
  const { dataUserCart } = getUserCart()
  const router = useRouter()

  const [checked, setChecked] = useState<boolean>(false)

  const userCartData = dataUserCart?.data?.data?.userCart
  const totalPrice = dataUserCart?.data?.data?.totalPrice

  const handleCheckout = () => {
    router.push('/checkout/[checkoutDetail]')
  }

  const handleSelectAll = (event: any) => {
    const isChecked = event.target.checked
    setChecked(isChecked)
  }

  useEffect(() => {
    mutationSelectedAll({ isChecked: checked })
  }, [checked])

  useEffect(() => {
    const allSelected =
      userCartData?.every((item: any) => item.selected) || false
    setChecked(allSelected)
  }, [userCartData])

  return (
    <div className='container mx-auto flex flex-col p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Shopping Cart</h1>
      <p className='mb-4'>Total items: {userCartData?.length || 0}</p>
      <div className='form-control w-[10%]'>
        <label className='label cursor-pointer'>
          <span className='label-text text-lg'>Select All</span>
          <input
            type='checkbox'
            className='checkbox'
            onChange={handleSelectAll}
            checked={checked}
          />
        </label>
      </div>
      <div className='flex gap-11'>
        <div className='flex w-full'>
          <div className='flex w-full'>
            <div className='ic flex h-[700px] w-full snap-y snap-mandatory flex-col items-center gap-5 overflow-y-scroll p-10'>
              {userCartData?.map((x: any, i: any) => {
                return (
                  <div key={i}>
                    <Cart
                      name={x?.Product?.name}
                      productId={x?.Product?.id}
                      id={x?.id}
                      qty={x?.qty}
                      price={x?.Product?.price}
                      html={`cart_model${x?.id}`}
                      desc={x?.Product?.description}
                      isChecked={x?.selected}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='flex w-[30%] flex-col items-center justify-center gap-5 rounded-md bg-ebony shadow-md'>
          <div className='flex w-full justify-center'>
            <h2 className='text-xl font-bold text-white'>
              Total Price:{' '}
              {totalPrice?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </h2>
          </div>
          <button
            onClick={handleCheckout}
            className='flex w-[90%] justify-center rounded bg-eggplant px-4 py-2 text-white hover:border-ebony hover:bg-hover_eggplant'
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage

'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useCartStore from '@/zustand/cart/cartStore'
import { getUserCart } from '@/helpers/cart/hooks/getUserCart'
import Cart from '@/components/cart'

const CartPage: React.FC = () => {
  const { dataUserCart } = getUserCart()
  const router = useRouter()

  const userCartData = dataUserCart?.data?.data
  console.log(userCartData)
  // console.log(typeof userCartData)

  const handleCheckout = () => {
    router.push('/checkout/[checkoutDetail]')
  }

  return (
    <div className='container mx-auto flex flex-col bg-blue-100 p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Shopping Cart</h1>
      <p className='mb-4'>Total items: 0</p>
      <div className='flex gap-11'>
        <div className='flex w-full'>
          <div className='flex w-full'>
            <div className='ic flex h-[700px] w-full snap-y snap-mandatory flex-col items-center gap-5 overflow-y-scroll p-10'>
              {userCartData?.map((x: any, i: any) => {
                return (
                  <div key={i}>
                    <Cart
                      name={x?.Product?.name}
                      id={x?.id}
                      qty={x?.qty}
                      price={x?.Product?.price}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='flex w-[30%] flex-col items-center justify-center gap-5 bg-green-200'>
          <div className='flex w-full justify-center'>
            <h2 className='text-xl font-bold'>Total Price: Rp 0</h2>
          </div>
          <button
            onClick={handleCheckout}
            className='flex w-[90%] justify-center rounded bg-green-500 px-4 py-2 text-white'
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useGetCartDetail } from '@/helpers/cart/hooks/getCartDetail'
import Loading from '../cores/Loading'
import { useAddToCartDetail } from '@/helpers/cart/hooks/useAddToCartDetail'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useDeleteCart } from '@/helpers/cart/hooks/useDeleteCart'
import { useSetSelectedCart } from '@/helpers/cart/hooks/useSetSelectedCart'
import { useQueryClient } from '@tanstack/react-query'

interface CartProps {
  id: number
  name: string
  desc: string
  qty: number
  price: number
  html: string
  productId: number
  isChecked?: boolean
}

function debounce(func: any, wait: any) {
  let timeout: any
  return function (...args: any) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function Cart(props: CartProps) {
  const queryClient = useQueryClient()

  const { mutationSelectedCart } = useSetSelectedCart()
  const { mutationAddToCartDetail } = useAddToCartDetail()
  const { mutationDeleteCart, isSuccess } = useDeleteCart()

  const { dataCartDetail, CartDetailLoading } = useGetCartDetail(
    props.productId
  )
  const cartDetailData = dataCartDetail?.data?.data?.cartDetail
  const productImage = dataCartDetail?.data?.data?.productImage

  const [qty, setQty] = useState<number>(props.qty)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [checked, setChecked] = useState<boolean>(props.isChecked ?? false)

  useEffect(() => {
    if (cartDetailData?.Product?.price) {
      setTotalPrice(qty * cartDetailData.Product.price)
    }

    if (cartDetailData?.isChecked !== undefined) {
      setChecked(cartDetailData.isChecked === 'TRUE')
    }
  }, [cartDetailData, qty])

  const handleDecrement = () => {
    const newQty = Math.max(1, qty - 1)
    setQty(newQty)
  }

  const handleIncrement = () => {
    setQty(qty + 1)
  }

  const debouncedMutation = debounce(() => {
    mutationAddToCartDetail({
      productId: props.productId,
      qty: qty,
    })
  }, 1000)

  const handleDeleteCart = () => {
    mutationDeleteCart(props.id)
  }

  useEffect(() => {
    debouncedMutation()
  }, [qty])

  useEffect(() => {
    mutationSelectedCart({ isChecked: checked, productId: props.id })
  }, [checked])

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) location.reload()
    }, 2000)
  })

  if (CartDetailLoading) return <Loading />

  return (
    <div
      key={props.id}
      className={`flex w-[700px] justify-between gap-3 rounded-xl border-2 p-5 shadow-xl`}
    >
      <input
        type='checkbox'
        className='checkbox'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <div className='flex w-full justify-between gap-3'>
        <div className='avatar'>
          <div className='w-32 rounded'>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${productImage[0]?.productUrl}`}
              alt={`product ${props.id}`}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className='flex w-full flex-col items-start justify-center gap-4 p-2'>
          <h1 className='font-bold'>{props.name}</h1>
          <p>{props.desc}</p>
        </div>
        <div className='flex w-[300px] flex-col items-center justify-center gap-2 p-2'>
          <div>
            {totalPrice.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </div>
          <div className='join flex h-fit w-fit items-center justify-center rounded-md bg-eggplant text-white hover:bg-hover_eggplant'>
            <button
              onClick={handleDecrement}
              className='btn join-item btn-sm border-eggplant bg-eggplant text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
            >
              -
            </button>
            <label
              htmlFor={props.html}
              className='btn join-item btn-sm min-w-[70px] border-eggplant bg-eggplant text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
            >
              {qty}
            </label>
            <input type='checkbox' id={props.html} className='modal-toggle' />
            <div className='modal' role='dialog'>
              <div className='modal-box flex w-full flex-col items-center justify-between gap-3 bg-ebony'>
                <h3 className='text-lg font-bold'>Input your quantity</h3>
                <input
                  type='number'
                  placeholder='Type Number '
                  className='input w-full max-w-xs text-ebony'
                  defaultValue={qty}
                  min={1}
                  onChange={(e) => setQty(Number(e.target.value))}
                />
                <div className='modal-action'>
                  <label
                    htmlFor={props.html}
                    className='btn border-eggplant bg-eggplant text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
                  >
                    Close!
                  </label>
                </div>
              </div>
            </div>
            <button
              onClick={handleIncrement}
              className='btn join-item btn-sm border-eggplant bg-eggplant text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
            >
              +
            </button>
          </div>
          <div
            onClick={handleDeleteCart}
            className='btn btn-sm border-white bg-white hover:bg-bombay'
          >
            <MdOutlineDeleteOutline size={25} />
          </div>
        </div>
      </div>
    </div>
  )
}

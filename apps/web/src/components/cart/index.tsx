import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getCartDetail } from '@/helpers/cart/hooks/getCartDetail'
import Loading from '../cores/Loading'
import { useAddToCartDetail } from '@/helpers/cart/hooks/useAddToCartDetail'

export default function Cart(props: any) {
  const { mutationAddToCartDetail } = useAddToCartDetail()

  const { dataCartDetail, CartDetailLoading } = getCartDetail(props.id)
  const cartDetailData = dataCartDetail?.data?.data?.cartDetail
  const productImage = dataCartDetail?.data?.data?.productImage

  const [qty, setQty] = useState(props.qty)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (cartDetailData?.Product?.price) {
      setTotalPrice(qty * cartDetailData.Product.price)
    }
  }, [cartDetailData, qty])

  const handleDecrement = () => {
    setQty(qty - 1)
    if (qty == 1) {
      setQty(1)
      setTotalPrice(1 * cartDetailData?.Product?.price)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      mutationAddToCartDetail({
        productId: props.id,
        qty: qty,
      })
    }, 2000)
  }, [qty])

  if (CartDetailLoading) return <Loading />

  return (
    <div
      key={props.id}
      className='flex w-[700px] justify-between gap-3 rounded-xl bg-red-200 p-5 shadow-xl'
    >
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
      <div className='flex w-full flex-col items-start justify-center gap-4 bg-blue-100 p-2'>
        <h1 className='font-bold'>{props.name}</h1>
        <p>{props.desc}</p>
      </div>
      <div className='flex w-[300px] flex-col items-center justify-center gap-2 bg-green-100 p-2'>
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
            onClick={() => setQty(qty + 1)}
            className='btn join-item btn-sm border-eggplant bg-eggplant text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

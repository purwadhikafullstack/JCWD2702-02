import Image from 'next/image'
import { useState } from 'react'

export default function Cart(props: any) {
  // console.log(props)
  const [qty, setQty] = useState(props.qty)
  const [totalPrice, setTotalPrice] = useState(props.qty * props.price)

  const price: number = 1_500_000

  // console.log(totalPrice)

  const handleDecrement = () => {
    setQty(qty - 1)
    if (qty == 1) {
      setQty(1)
    }
    setTotalPrice(totalPrice - props.price)
  }

  // const totalPrice = props.qty * props.price

  return (
    <div
      key={props.id}
      className='flex w-[700px] justify-between gap-3 rounded-xl bg-red-200 p-5 shadow-xl'
    >
      <div className='avatar'>
        <div className='w-32 rounded'>
          <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
        </div>
      </div>
      <div className='flex w-full items-center justify-start bg-blue-100 p-2'>
        {props.name}
      </div>
      <div className='flex w-[300px] flex-col items-center justify-center gap-2 bg-green-100 p-2'>
        <div>
          {totalPrice.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </div>
        <div className='flex h-[35px] w-[80%] items-center justify-between gap-5 rounded-md bg-eggplant px-3 text-white hover:bg-hover_eggplant'>
          <button onClick={handleDecrement}>-</button>
          <div>{qty}</div>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
      </div>
    </div>
  )
}

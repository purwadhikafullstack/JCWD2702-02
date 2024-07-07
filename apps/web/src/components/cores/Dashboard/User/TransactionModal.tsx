import { ReactNode, useEffect, useState } from 'react'
import { useGetTransactionDetail } from '@/helpers/checkout/hooks/getTransactionDetail'
import SelectedCart from '@/components/cart/SelectedCart'
import OrderItems from '@/components/cart/OrderItems'
import moment from 'moment'

interface TransactionModalProps {
  html: string
  head: string
  subject: string
  fn?: () => void
  icon?: ReactNode
  body: string
  href?: string
  id: number | string
}

export default function TransactionModal(props: TransactionModalProps) {
  const [orderData, setOrderData] = useState<any>()
  const [items, setItems] = useState<any>()
  const [date, setDate] = useState<any>()
  const [status, setStatus] = useState<any>()
  const [totalPrice, setTotalPrice] = useState<any>()
  const { dataTransactionDetail } = useGetTransactionDetail(Number(props.id))

  const data = dataTransactionDetail?.data?.data

  useEffect(() => {
    if (dataTransactionDetail) {
      setOrderData(dataTransactionDetail?.data?.data)
      setDate(moment(dataTransactionDetail?.data?.data?.createdAt))
      setItems(dataTransactionDetail?.data?.data?.items)
      setStatus(dataTransactionDetail?.data?.data?.status)
      setTotalPrice(dataTransactionDetail?.data?.data?.totalOrderAmount)
    }
  }, [dataTransactionDetail])
  return (
    <>
      <div className='card-actions justify-end'>
        <label
          htmlFor={props.html}
          className='flex h-full items-center justify-center font-bold text-eggplant hover:underline'
        >
          {props.head}
        </label>
        <input type='checkbox' id={props.html} className='modal-toggle' />
        <div className='modal' role='dialog'>
          <div className='modal-box flex h-[700px] w-[700px] flex-col items-center justify-center gap-3'>
            <div className='flex w-full flex-col items-center'>
              <h1 className='font-bold'>{props.subject}</h1>
              <div className='divider'></div>
            </div>
            <div className='flex w-full justify-between px-3'>
              <p className='font-bold'>Order Id :</p>
              <p className='flex justify-end'>{props.id}</p>
            </div>
            <div className='flex w-full justify-between px-3'>
              <p className='font-bold'>Transaction Date :</p>
              <p className='-300 flex justify-end'>{date?.toString()}</p>
            </div>
            <div className='flex w-full justify-between px-3'>
              <p className='font-bold'>Total Price :</p>
              <p className='-300 flex justify-end'>
                {totalPrice?.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
            </div>
            <div className='flex w-full justify-between px-3'>
              <p className='font-bold'>Transaction Status :</p>
              {status == 'WAITING_FOR_PAYMENT' ? (
                <p className='-300 flex justify-end'>Waiting for payment</p>
              ) : status == 'WAITING_FOR_CONFIRMATION' ? (
                <p className='-300 flex justify-end'>
                  Waiting for confirmation
                </p>
              ) : status == 'PAID' ? (
                <p className='-300 flex justify-end'>Paid</p>
              ) : status == 'CANCELLED' ? (
                <p className='-300 flex justify-end'>Cancelled</p>
              ) : null}
            </div>
            {status == 'WAITING_FOR_PAYMENT' ? (
              <a
                href={props.href}
                target='_blank'
                className='flex cursor-pointer items-center justify-center font-bold text-eggplant underline hover:text-hover_eggplant'
              >
                {props.body}
              </a>
            ) : null}

            <div className='flex w-full flex-col items-center'>
              <div className='divider'></div>
              <div className='flex w-full items-center justify-center font-bold'>
                Product Detail
              </div>
              <div className='divider'></div>
            </div>
            <div className='flex h-[500px] w-full snap-y snap-mandatory flex-col items-center gap-5 overflow-y-auto p-20'>
              {items?.map((x: any, i: any) => {
                return (
                  <div key={i} className='snap-center'>
                    <OrderItems
                      id={x?.id}
                      productId={x?.productId}
                      name={x?.product?.name}
                      price={x?.currentPrice}
                      qty={x?.quantity}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <label className='modal-backdrop' htmlFor={props.html}>
            Close
          </label>
        </div>
      </div>
    </>
  )
}

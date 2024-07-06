'use client'

import { useEffect, useState } from 'react'
import { useGetUserTransaction } from '@/helpers/checkout/hooks/getUserTransaction'
import TransactionListBox from './TransactionListBox'

export default function UserTransaction() {
  const [orderData, setOrderData] = useState<[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [orderStatus, setOrderStatus] = useState('All')

  const statusList = [
    ['All', 'All'],
    ['Waiting For Payment', 'WAITING_FOR_PAYMENT'],
    ['Waiting For Confirmation', 'WAITING_FOR_CONFIRMATION'],
    ['Paid', 'PAID'],
    ['Cancelled', 'CANCELLED'],
  ]

  const { dataUserTransaction, userTransactionLoading } = useGetUserTransaction(
    page,
    orderStatus
  )

  useEffect(() => {
    if (dataUserTransaction) {
      setOrderData(dataUserTransaction?.data?.data?.data)
      setTotalPages(dataUserTransaction?.data?.data?.totalPages)
    }
  })

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div className='flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white px-10 py-5 shadow-md'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex h-full w-full items-center justify-center text-xl font-bold'>
          Transaction List
        </div>
        <div className='divider w-full'></div>
        <div className='flex w-full items-center justify-between sm:flex-col md:gap-2 xl:gap-4'>
          <div className='flex px-5 text-xl font-bold'>Status</div>
          <div className='flex w-full sm:justify-center md:gap-3 lg:gap-2 xl:gap-5'>
            {statusList.map((x: any, i: any) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setOrderStatus(x[1])
                    setPage(1)
                  }}
                  className='btn bg-eggplant text-white sm:btn-xs hover:bg-hover_eggplant'
                >
                  {x[0]}
                </div>
              )
            })}
          </div>
        </div>
        <div className='divider w-full'></div>
      </div>
      <div className='flex w-full'>
        <div className='flex h-[600px] w-full snap-y snap-mandatory flex-col items-center gap-5 overflow-y-scroll p-10'>
          {orderData?.map((x: any, i: any) => {
            return (
              <TransactionListBox
                key={i}
                title={x?.id}
                item={x?.items}
                date={x?.createdAt}
                href={x?.paymentUrl}
                status={x?.status}
              />
            )
          })}
        </div>
      </div>
      <div className='join flex w-full justify-center'>
        <button
          onClick={handlePreviousPage}
          disabled={page == 1}
          className='btn join-item'
        >
          «
        </button>
        <button className='btn join-item'>
          Page {page} of {totalPages}
        </button>
        <button
          onClick={handleNextPage}
          disabled={page == totalPages}
          className='btn join-item'
        >
          »
        </button>
      </div>
    </div>
  )
}

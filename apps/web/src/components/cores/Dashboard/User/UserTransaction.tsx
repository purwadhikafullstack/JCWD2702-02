'use client'

import { FiPlus } from 'react-icons/fi'
import { getUserTransaction } from '@/helpers/checkout/hooks/getUserTransaction'
import TransactionListBox from './TransactionListBox'

export default function UserTransaction() {
  const { dataUserTransaction, userTransactionLoading } = getUserTransaction()
  const userTransactionData = dataUserTransaction?.data?.data

  // console.log(userTransactionData)
  return (
    <div className='flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white px-10 py-5 shadow-md'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex h-full w-full items-center justify-center text-xl font-bold'>
          Transaction List
        </div>
        <div className='divider w-full'></div>
        <div className='flex w-full items-center justify-between gap-4'>
          <div className='flex px-5 text-xl font-bold'>Status</div>
          <div className='flex w-full gap-5'>
            <div className='btn bg-eggplant text-white hover:bg-hover_eggplant'>
              All
            </div>
            <div className='btn bg-eggplant text-white hover:bg-hover_eggplant'>
              Waiting For Payment
            </div>
            <div className='btn bg-eggplant text-white hover:bg-hover_eggplant'>
              Waiting For Confirmation
            </div>
            <div className='btn bg-eggplant text-white hover:bg-hover_eggplant'>
              Paid
            </div>
          </div>
        </div>
        <div className='divider w-full'></div>
      </div>
      <div className='flex w-full'>
        <div className='flex h-[400px] w-full snap-y snap-mandatory flex-col items-center gap-5 overflow-y-scroll p-10'>
          {userTransactionData?.map((x: any, i: any) => {
            return (
              <TransactionListBox
                key={i}
                title={x?.id}
                item={x?.items}
                date={x?.createdAt}
                href={x?.paymentUrl}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

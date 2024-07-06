import Image from 'next/image'
import TransactionModal from './TransactionModal'

interface TransactionListBoxProps {
  title: string
  item: [{}] | any
  date: string
  href: string
  status: string
}

export default function TransactionListBox(props: TransactionListBoxProps) {
  const items = props.item
  const date = props.date.split('T')[0]

  return (
    <div className='card w-full bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div>{props.title}</div>
            {props.status == 'WAITING_FOR_PAYMENT' ? (
              <span className='badge bg-blue-400'>Waiting for payment</span>
            ) : props.status == 'WAITING_FOR_CONFIRMATION' ? (
              <span className='badge bg-blue-400'>
                Waiting for confirmation
              </span>
            ) : props.status == 'CANCELLED' ? (
              <span className='badge bg-red-400'>Cancelled</span>
            ) : props.status == 'PAID' ? (
              <span className='badge bg-green-400'>Paid</span>
            ) : null}
          </div>
          <div>{date}</div>
        </h2>
        <div className='divider'></div>
        <div className='flex flex-col gap-5'>
          <div className='flex w-full'>
            <div className='avatar'>
              <div className='w-24 rounded'>
                <Image
                  alt={items[0]?.product?.name}
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${items[0]?.product?.ProductImages[0]?.productUrl}`}
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
            <div className='flex flex-col items-start justify-center p-4'>
              <h3 className='text-xl font-bold'>{items[0]?.product?.name}</h3>
              <p className='text-[17px]'>
                {' '}
                {items[0].quantity} x{' '}
                {items[0]?.currentPrice.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
            </div>
          </div>
          {items.length > 1 ? (
            <p className='font-bold underline'>{`${items.length - 1}+ more product `}</p>
          ) : null}
        </div>
        <TransactionModal
          id={props.title}
          body='Payment Link'
          head='Transaction Detail'
          html={props.title}
          subject='Transaction Detail'
          href={props.href}
        />
      </div>
    </div>
  )
}

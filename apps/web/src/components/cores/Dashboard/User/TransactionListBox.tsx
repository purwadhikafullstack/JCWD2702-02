import Image from 'next/image'
import TransactionModal from './TransactionModal'

interface TransactionListBoxProps {
  title: string
  item: [{}] | any
  date: string
  href: string
}

export default function TransactionListBox(props: TransactionListBoxProps) {
  const items = props.item
  const date = props.date.split('T')[0]

  return (
    <div className='card w-[60%] bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div>{props.title}</div>
            <span className='badge bg-green-400'>Badge</span>
          </div>
          <div>{date}</div>
        </h2>
        <div className='divider'></div>
        {items && items.length > 0 ? (
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
              <p className='font-bold underline'>{`${items.length - 1}+ more product`}</p>
            ) : null}
          </div>
        ) : (
          <p>No items found</p>
        )}
        <TransactionModal
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

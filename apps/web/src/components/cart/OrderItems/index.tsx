import { useGetCartDetail } from '@/helpers/cart/hooks/getCartDetail'
import Image from 'next/image'
import Loading from '../../cores/Loading'

interface OrderItemsProps {
  productId: number
  name: string
  qty: number
  price: number
  id: any
}

export default function OrderItems(props: OrderItemsProps) {
  const { dataCartDetail, CartDetailLoading } = useGetCartDetail(
    props.productId
  )

  const productImage = dataCartDetail?.data?.data?.productImage[0]?.productUrl

  return (
    <div className='card card-side h-[170px] border-2 border-white bg-concrete'>
      <figure className='w-[50%] bg-ebony'>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${productImage}`}
          alt={`product ${props.id}`}
          width={150}
          height={100}
          className='bg-center'
        />
      </figure>
      <div className='card-body flex h-full w-[50%] flex-col items-center justify-center'>
        <h2 className='card-title'>{props.name}</h2>
        <p>
          {props.qty} x{' '}
          {props.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </p>
      </div>
    </div>
  )
}

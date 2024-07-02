import { getCartDetail } from '@/helpers/cart/hooks/getCartDetail'
import Image from 'next/image'
import Loading from '../cores/Loading'

export default function SelectedCart(props: any) {
  const { dataCartDetail, CartDetailLoading } = getCartDetail(props.productId)

  const cartDetailData = dataCartDetail?.data?.data?.cartDetail
  const productImage = dataCartDetail?.data?.data?.productImage[0]?.productUrl

  if (CartDetailLoading || !cartDetailData || !productImage) return <Loading />
  return (
    <div className='card card-side h-[170px] border-2 border-white bg-concrete shadow-xl'>
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
        <h2 className='card-title'>{cartDetailData?.Product?.name}</h2>
        <p>
          {cartDetailData?.qty} x{' '}
          {cartDetailData?.Product?.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </p>
      </div>
    </div>
  )
}

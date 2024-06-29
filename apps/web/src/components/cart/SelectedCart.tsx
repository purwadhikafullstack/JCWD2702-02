import { getCartDetail } from '@/helpers/cart/hooks/getCartDetail'

export default function SelectedCart(props: any) {
  //   console.log(props)

  const { dataCartDetail } = getCartDetail(props.productId)

  const cartDetailData = dataCartDetail?.data?.data?.cartDetail
  const productImage = dataCartDetail?.data?.data?.productImage

  //   console.log(dataCartDetail)
//   console.log(cartDetailData)
//   console.log(productImage)
  return (
    <div className='card card-side h-[170px] bg-base-100 shadow-xl'>
      <figure>
        <img
          src='https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg'
          alt='Movie'
        />
      </figure>
      <div className='card-body flex h-full flex-col items-center justify-center'>
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

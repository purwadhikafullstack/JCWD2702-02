import { useAddToCartMutation } from '../api/useAddToCartMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useAddToCartDetailMutation } from '../api/useAddToCartDetailMutation'
import { useGetUserCart } from './getUserCart'

export const useAddToCartDetail = () => {
  const { refetch } = useGetUserCart()
  const {
    mutate: mutationAddToCartDetail,
    data: dataRegister,
    isSuccess,
    isPending,
    isError,
  } = useAddToCartDetailMutation({
    onSuccess: (res: any) => {
      refetch()
    },
    onError: (err: any) => {
    },
  })

  return {
    mutationAddToCartDetail,
    isSuccess,
    isPending,
    isError,
  }
}

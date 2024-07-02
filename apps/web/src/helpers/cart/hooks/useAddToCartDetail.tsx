import { useAddToCartMutation } from '../api/useAddToCartMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useAddToCartDetailMutation } from '../api/useAddToCartDetailMutation'
import { getUserCart } from './getUserCart'

export const useAddToCartDetail = () => {
  const { refetch } = getUserCart()
  const {
    mutate: mutationAddToCartDetail,
    data: dataRegister,
    isSuccess,
    isPending,
    isError,
  } = useAddToCartDetailMutation({
    onSuccess: (res: any) => {
      //   console.log(res)
      //   toast.success(res.data.message, {
      //     position: 'top-right',
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'colored',
      //     transition: Slide,
      //   })
      refetch()
    },
    onError: (err: any) => {
      //   console.log(err)
      //   toast.error(err.response.data.message, {
      //     position: 'top-right',
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'colored',
      //     transition: Slide,
      //   })
    },
  })

  return {
    mutationAddToCartDetail,
    isSuccess,
    isPending,
    isError,
  }
}

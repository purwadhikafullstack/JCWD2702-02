import { useAddToCartMutation } from '../api/useAddToCartMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useAddToCartDetailMutation } from '../api/useAddToCartDetailMutation'

export const useAddToCartDetail = () => {
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

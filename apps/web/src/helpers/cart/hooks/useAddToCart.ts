import { useAddToCartMutation } from '../api/useAddToCartMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'

export const useAddToCart = () => {
  const {
    mutate: mutationAddToCart,
    data: dataRegister,
    isSuccess,
    isPending,
    isError,
  } = useAddToCartMutation({
    onSuccess: (res: any) => {
      toast.success(res.data.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      })
    },
    onError: (err: any) => {
      toast.error(err.response.data.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      })
    },
  })

  return {
    mutationAddToCart,
    isSuccess,
    isPending,
    isError,
  }
}

import { useAddToCartMutation } from '../api/useAddToCartMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'

export const useAddToCart = () => {
  const navigate = useRouter()
  const {
    mutate: mutationAddToCart,
    data: dataRegister,
    isSuccess,
    isPending,
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
      //   navigate.push('/')
      console.log(res)
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
      console.log(err)
    },
  })

  return {
    mutationAddToCart,
    isSuccess,
    isPending,
  }
}

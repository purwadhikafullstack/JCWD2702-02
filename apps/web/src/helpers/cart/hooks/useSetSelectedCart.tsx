import { toast } from 'react-toastify'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useDeleteCartMutation } from '../api/useDeleteCartMutation'
import { useSetSelectedCartMutation } from '../api/useSetSelectedCartMutation'
import { useGetUserCart } from './getUserCart'
import { useQueryClient } from '@tanstack/react-query'

export const useSetSelectedCart = () => {
  const queryClient = useQueryClient()

  const { refetch } = useGetUserCart()
  const {
    mutate: mutationSelectedCart,
    data: dataRegister,
    isSuccess,
    isPending,
    isError,
  } = useSetSelectedCartMutation({
    onSuccess: (res: any) => {
      console.log(res)
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
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      refetch()
    },
    onError: (err: any) => {
      console.log(err)
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
    mutationSelectedCart,
    isSuccess,
    isPending,
    isError,
  }
}

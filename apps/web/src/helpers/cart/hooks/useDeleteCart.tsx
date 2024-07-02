import { toast } from 'react-toastify'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useDeleteCartMutation } from '../api/useDeleteCartMutation'

export const useDeleteCart = () => {
  const {
    mutate: mutationDeleteCart,
    data: dataRegister,
    isSuccess,
    isPending,
    isError,
  } = useDeleteCartMutation({
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
    mutationDeleteCart,
    isSuccess,
    isPending,
    isError,
  }
}

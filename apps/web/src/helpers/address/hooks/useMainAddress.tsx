import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'
import { getUserAddress } from './getUserAddress'
import { useMainAddressMutation } from '../api/useMainAddressMutation'

export const useMainAddress = () => {
  const { refetch } = getUserAddress()
  const { mutate: mutationMainAddress } = useMainAddressMutation({
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
      refetch()
    },
    onError: (err: any) => {
      toast.error(err.response.data.message, {
        position: 'top-right',
        autoClose: 1500,
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
    mutationMainAddress,
  }
}

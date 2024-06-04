import { useRegisterMutation } from '../api/useRegisterMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'

export const useRegister = () => {
  const navigate = useRouter()
  const {
    mutate: mutationRegister,
    data: dataRegister,
    isSuccess,
    isPending,
  } = useRegisterMutation({
    onSuccess: (res: any) => {
      toast.success(res.data.message, {
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
    mutationRegister,
    dataRegister,
    isSuccess,
    isPending,
  }
}

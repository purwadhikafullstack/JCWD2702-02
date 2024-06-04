import { useUserLoginMutation } from '../api/useUserLoginMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'

export const useUserLogin = () => {
  const navigate = useRouter()
  const { mutate: mutationLogin, isPending } = useUserLoginMutation({
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
      navigate.push('/')
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
    mutationLogin,
    isPending,
  }
}

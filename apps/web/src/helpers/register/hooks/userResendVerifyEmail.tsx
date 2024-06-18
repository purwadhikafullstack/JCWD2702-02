import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useResendEmailVerifyMutation } from '../api/useResendEmailVerifyMutation'

export const useResendEmailVerify = () => {
  const navigate = useRouter()
  const { mutate: mutationResendEmail } = useResendEmailVerifyMutation({
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
      navigate.push('/')
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
    mutationResendEmail,
  }
}

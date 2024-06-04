import { useVerificationMutation } from './../api/useVerificationMutation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'

export const useVerification = () => {
  const navigate = useRouter()
  const { mutate: mutationVerification, isPending } = useVerificationMutation({
    onSuccess: (res: any) => {
      console.log(res)
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
      console.log(err)
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
      navigate.push('/')
    },
  })

  return {
    mutationVerification,
    isPending,
  }
}

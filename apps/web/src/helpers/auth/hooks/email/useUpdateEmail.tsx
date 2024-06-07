'use client'
import { useRouter } from 'next/navigation'
import { useUpdateEmailMutation } from '../../api/email/useUpdateEmailMutation'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'

export const useUpdateEmail = () => {
  const navigate = useRouter()
  const { mutate: mutationUpdateEmail, isPending } = useUpdateEmailMutation({
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
    mutationUpdateEmail,
    isPending,
  }
}

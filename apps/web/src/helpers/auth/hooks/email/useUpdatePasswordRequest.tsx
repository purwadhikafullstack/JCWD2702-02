'use client'
import { useUpdateEmailRequestMutation } from '../../api/email/useUpdateEmailRequestMutation'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'

export const useUpdateEmailRequest = () => {
  const { mutate: mutationUpdateEmailRequest, isPending } =
    useUpdateEmailRequestMutation({
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
    mutationUpdateEmailRequest,
    isPending,
  }
}

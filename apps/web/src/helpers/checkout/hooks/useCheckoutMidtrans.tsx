import { toast } from 'react-toastify'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useCheckoutMidtransMutation } from '../api/useCheckoutMidtransMutation'
import { useRouter } from 'next/navigation'

export const useCheckoutMidtrans = () => {
  const navigate = useRouter()
  const {
    mutate: mutationCheckoutMidtrans,
    data: dataRegister,
    isSuccess,
    isPending,
    isError,
  } = useCheckoutMidtransMutation({
    onSuccess: (res: any) => {
      //   console.log(res)
      toast.success(
        'Create sransaction success, payment link has been sent to your profile',
        {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Slide,
        }
      )
      setTimeout(() => {
        navigate.push('/dashboard/user')
      }, 1000)
    },
    onError: (err: any) => {
      //   console.log(err)
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
    mutationCheckoutMidtrans,
    isSuccess,
    isPending,
    isError,
  }
}

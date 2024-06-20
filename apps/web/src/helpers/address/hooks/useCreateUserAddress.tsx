import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'
import { useCreateUserAddressMutation } from '../api/useCreateUserAddressMutation'

export const useCreateUserAddress = () => {
  const navigate = useRouter()

  const { mutate: mutationCreateAddress } = useCreateUserAddressMutation({
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
      //   navigate.push('/')
    },
    onError: (err: any) => {
      console.log(err)
      //   toast.error(err.response.data.message, {
      //     position: 'top-right',
      //     autoClose: 1500,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'colored',
      //     transition: Slide,
      //   })
      //   navigate.push('/')
    },
  })

  return {
    mutationCreateAddress,
  }
}

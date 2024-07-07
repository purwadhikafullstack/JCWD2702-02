import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'
import { useGetUserAddress } from './getUserAddress'
import { useUpdateAddressMutation } from '../api/useUpdateAddressMutation'

export const useUpdateAddress = () => {
  const { refetch } = useGetUserAddress()
  const { mutate: mutationUpdateAddress, isSuccess } = useUpdateAddressMutation(
    {
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
        // refetch()
        // location.reload()
      },
      onError: (err: any) => {
        console.log(err)
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
    }
  )

  return {
    mutationUpdateAddress,
    isSuccess,
  }
}

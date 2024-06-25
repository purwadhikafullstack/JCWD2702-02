import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'
import { useCreateAdminMutation } from '../api/useCreateAdminMutation'

export const useCreateAdmin = () => {
  const {
    mutate: mutationCreateAdmin,
    isSuccess,
    data: createAdminData,
  } = useCreateAdminMutation({
    onSuccess: (res: any) => {
      // console.log(res)
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
      // console.log(err)
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
    mutationCreateAdmin,
    isSuccess,
    createAdminData,
  }
}

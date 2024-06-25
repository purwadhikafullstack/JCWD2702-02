import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'
import { useDeleteAdminMutation } from '../api/useDeleteAdminMutation'
import { useDeleteUserMutation } from '../api/useDeleteUserMutation'

export const useDeleteUser = () => {
  const {
    mutate: mutationDeleteUser,
    isSuccess,
    data: deleteAdmin,
  } = useDeleteUserMutation({
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
    mutationDeleteUser,
    isSuccess,
    deleteAdmin,
  }
}

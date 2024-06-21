import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'
import { useCreateUserAddressMutation } from '../api/useCreateUserAddressMutation'
import { getUserAddress } from './getUserAddress'
import { useContext } from 'react'
import { SideBarContext } from '@/config/context/sideBarContext'

export const useCreateUserAddress = () => {
  const { sideBar, setSideBar }: any = useContext(SideBarContext)

  const { refetch } = getUserAddress()
  const { mutate: mutationCreateAddress } = useCreateUserAddressMutation({
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
      refetch()
      location.reload()
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
    mutationCreateAddress,
  }
}

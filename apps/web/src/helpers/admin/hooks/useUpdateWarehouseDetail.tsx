import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'
import { setCookie } from '@/config/cookie'
import { UserContext } from '@/config/context/userContext'
import { useContext } from 'react'
import { useAdminLoginMutation } from '../api/useAdminLoginMutation'
import { useCreateUserMutation } from '../api/useCreateUserMutation'
import { useCreateWarehouseMutation } from '../api/useCreateWarehouseMutation'
import { useUpdateWarehouseDetailMutation } from '../api/useUpdateWarehouseDetailMutation'

export const useUpdateWarehouseDetail = () => {
  const { userData, setUserData }: any = useContext(UserContext)

  const navigate = useRouter()

  const {
    mutate: mutationUpdateWarehouse,
    isSuccess,
    data: createWarehouseData,
  } = useUpdateWarehouseDetailMutation({
    onSuccess: (res: any) => {
      //   console.log(res)
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
      //   console.log(err)
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
    mutationUpdateWarehouse,
    isSuccess,
    createWarehouseData,
  }
}

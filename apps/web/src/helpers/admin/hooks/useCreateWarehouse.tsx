import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'
import { setCookie } from '@/config/cookie'
import { UserContext } from '@/config/context/userContext'
import { useContext } from 'react'
import { useAdminLoginMutation } from '../api/useAdminLoginMutation'
import { useCreateUserMutation } from '../api/useCreateUserMutation'
import { useCreateWarehouseMutation } from '../api/useCreateWarehouseMutation'

export const useCreateWarehouse = () => {
  const { userData, setUserData }: any = useContext(UserContext)

  const navigate = useRouter()

  const {
    mutate: mutationCreateWarehouse,
    isSuccess,
    data: createWarehouseData,
  } = useCreateWarehouseMutation({
    onSuccess: (res: any) => {
    },
    onError: (err: any) => {
    },
  })

  return {
    mutationCreateWarehouse,
    isSuccess,
    createWarehouseData,
  }
}

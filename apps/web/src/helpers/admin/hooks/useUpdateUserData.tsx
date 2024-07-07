import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'
import { setCookie } from '@/config/cookie'
import { UserContext } from '@/config/context/userContext'
import { useContext } from 'react'
import { useAdminLoginMutation } from '../api/useAdminLoginMutation'
import { useCreateUserMutation } from '../api/useCreateUserMutation'
import { useUpdateUserDataMutation } from '../api/useUpdateUserDataMutation'

export const useUpdateUserData = () => {
  const { userData, setUserData }: any = useContext(UserContext)

  const navigate = useRouter()

  const {
    mutate: mutationUpdateUserData,
    isSuccess,
    data: createUserData,
  } = useUpdateUserDataMutation({
    onSuccess: (res: any) => {
    },
    onError: (err: any) => {
    },
  })

  return {
    mutationUpdateUserData,
    isSuccess,
    createUserData,
  }
}

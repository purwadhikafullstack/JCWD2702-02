import { useKeepLoginMutation } from '../api/useKeepLoginMutation'
import { UserContext } from '@/config/context/userContext'
import { useContext } from 'react'
import { deleteCookie } from '@/config/cookie'

export const useKeepLogin = () => {
  const { userData, setUserData }: any = useContext(UserContext)

  const { mutate: mutationKeepLogin, isPending } = useKeepLoginMutation({
    onSuccess: (res: any) => {
      const response = res.data.data
      let nameResult = response.name
      nameResult = nameResult.split(' ')
      setUserData({
        fullname: response.name,
        firstname: nameResult[0],
        role: response.role,
        email: response.email,
        warehouse: response.warehouse,
      })
    },
    onError: async (err: any) => {

      localStorage.removeItem('auth')
      await deleteCookie()
      setUserData(null)
    },
  })

  return {
    mutationKeepLogin,
    isPending,
  }
}

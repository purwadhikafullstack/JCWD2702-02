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
      //   toast.error('Something went wrong please login again', {
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
      // console.log(err)

      localStorage.removeItem('auth')
      await deleteCookie()
      setUserData(null)
      // navigate.push('/')
      // setIsLogin(false)
    },
  })

  return {
    mutationKeepLogin,
    isPending,
  }
}

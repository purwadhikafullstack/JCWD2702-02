import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'
import { setCookie } from '@/config/cookie'
import { UserContext } from '@/config/context/userContext'
import { useContext } from 'react'
import { useAdminLoginMutation } from '../api/useAdminLoginMutation'

export const useAdminLogin = () => {
  const { userData, setUserData }: any = useContext(UserContext)

  const navigate = useRouter()

  const {
    mutate: mutationLogin,
    isSuccess,
    data: adminLoginData,
  } = useAdminLoginMutation({
    onSuccess: (res: any) => {
      const response = res.data.data
      setUserData({
        fullname: response.name,
        role: response.role,
        email: response.email,
      })
      localStorage.setItem(
        'auth',
        JSON.stringify({ acctkn: res.data.data.accesstoken })
      )
      setCookie(res.data.data.accesstoken)
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
  })

  return {
    mutationLogin,
    isSuccess,
    adminLoginData,
  }
}

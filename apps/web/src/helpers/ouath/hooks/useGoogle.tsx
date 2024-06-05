import { useLoginOauthMutation } from './../api/useGoogleQuery'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-toastify'
import { setCookie } from '@/config/cookie'
import { UserContext } from '@/config/context/userContext'
import { useContext } from 'react'

export const useOauthLogin = () => {
  const { userData, setUserData }: any = useContext(UserContext)

  const navigate = useRouter()

  const { mutate: mutationOauthLogin, isPending } = useLoginOauthMutation({
    onSuccess: (res: any) => {
      const response = res.data.data
      let nameResult = response.name
      nameResult = nameResult.split(' ')
      setUserData({
        fullname: response.name,
        firstname: nameResult[0],
        role: response.role,
        email: response.email,
      })
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
      navigate.push('/')
      // console.log(res)
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
      // console.log(err)
    },
  })

  return {
    mutationOauthLogin,
    isPending,
  }
}

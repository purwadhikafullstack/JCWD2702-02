import { useLoginOauthMutation } from './../api/useGoogleQuery'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'
import { setCookie } from '@/config/cookie'
import { UserContext } from '@/config/context/userContext'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'

export const useOauthLogin = () => {
  const { userData, setUserData }: any = useContext(UserContext)

  const {
    mutate: mutationOauthLogin,
    isPending,
    data,
  } = useLoginOauthMutation({
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
      localStorage.setItem(
        'auth',
        JSON.stringify({ acctkn: res.data.data.accesstoken })
      )
    },
    onError: (err: any) => {
    },
  })

  return {
    mutationOauthLogin,
    isPending,
    data,
  }
}

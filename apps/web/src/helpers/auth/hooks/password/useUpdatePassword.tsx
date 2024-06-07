'use client'
import { useUpdatePasswordMutation } from './../../api/password/useUpdatePasswordMutation'
import { UserContext } from '@/config/context/userContext'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCookie } from '@/config/cookie'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'

export const useUpdatePassword = () => {
  const { setUserData }: any = useContext(UserContext)
  const [, setIsLogin] = useState(false)
  const navigate = useRouter()
  const { mutate: mutationUpdatePassword, isPending } =
    useUpdatePasswordMutation({
      onSuccess: async (res: any) => {
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
        await deleteCookie()
        setUserData(null)
        navigate.push('/')
        setIsLogin(false)
        navigate.push('/')
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
    mutationUpdatePassword,
    isPending,
  }
}

'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface IUseCreateUserMutation {
  fullname: string
  email: string
  password: string
}

export const useCreateUserMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async ({
      fullname,
      email,
      password,
    }: IUseCreateUserMutation) => {
      return await axiosInstanceInterceptor.post('/auth/admin/user', {
        fullname,
        email,
        password,
      })
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isSuccess,
    data,
  }
}

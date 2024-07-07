'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface IUseCreateAdminMutation {
  fullname: string
  email: string
  password: string
}

export const useCreateAdminMutation = ({
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
    }: IUseCreateAdminMutation) => {
      return await axiosInstanceInterceptor.post(
        '/auth/admin/warehouse-admin',
        {
          fullname,
          email,
          password,
        }
      )
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

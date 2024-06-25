'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'

interface IReqUseRegisterMutation {
  email: string
  password: string
}

export const useAdminLoginMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async ({ email, password }: IReqUseRegisterMutation) => {
      return await axiosInstance.post('/auth/admin/login', {
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

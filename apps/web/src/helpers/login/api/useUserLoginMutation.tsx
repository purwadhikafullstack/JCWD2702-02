'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance } from '@/config/axios/axiosInstance'

interface IReqUseRegisterMutation {
  email: string
  password: string
}

export const useUserLoginMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async ({ email, password }: IReqUseRegisterMutation) => {
      return await axiosInstance.post(`/auth/login`, {
        email,
        password,
      })
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isPending,
    isSuccess,
  }
}

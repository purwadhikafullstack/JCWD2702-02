'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance } from '@/config/axios/axiosInstance'

interface IReqUpdatePasswordMutation {
  accesstoken: string
  password: string
  confirmPassword: string
}

export const useUpdatePasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      accesstoken,
      password,
      confirmPassword,
    }: IReqUpdatePasswordMutation) => {
      return await axiosInstance.post(
        '/auth/update-password',
        {
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            accesstoken: accesstoken,
          },
        }
      )
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isPending,
  }
}

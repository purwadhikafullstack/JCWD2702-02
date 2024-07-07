'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from './../../../config/axios/axiosInstance'

interface IUseRegisterMutation {
  accesstoken: string
  password: string
  confirmPassword: string
}

export const useVerificationMutation = ({
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
    }: IUseRegisterMutation) => {
      return await axiosInstance.post(
        '/auth/register/verification',
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

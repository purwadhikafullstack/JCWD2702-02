'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'

export const useForgotPasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return await axiosInstance.post('/auth/forgot-password', {
        email,
      })
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
  }
}

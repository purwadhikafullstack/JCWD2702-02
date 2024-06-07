'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface IReqResetPasswordMutation {
  password: string
  confirmPassword: string
}

export const useResetPasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await axiosInstanceInterceptor.post('/auth/reset-password')
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isPending,
  }
}

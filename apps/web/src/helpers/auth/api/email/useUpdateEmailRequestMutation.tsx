'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface IReqUpdateEmailRequestMutation {
  accesstoken: string
  email: string
  confirmEmail: string
}

export const useUpdateEmailRequestMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({}: IReqUpdateEmailRequestMutation) => {
      return await axiosInstanceInterceptor.post('/auth/reset-email')
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isPending,
  }
}

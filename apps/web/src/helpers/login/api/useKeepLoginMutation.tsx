'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useKeepLoginMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await axiosInstanceInterceptor.post('/auth/login/keep-login')
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isPending,
  }
}

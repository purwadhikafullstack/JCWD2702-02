'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useDeleteUserMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      return await axiosInstanceInterceptor.post(
        `/auth/admin/erase-user?userId=${userId}`
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

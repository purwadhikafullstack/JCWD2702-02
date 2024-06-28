'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useDeleteCartMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending, isError } = useMutation({
    mutationFn: async (cartId: number) => {
      return await axiosInstanceInterceptor.delete(`/carts?cartId=${cartId}`)
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    data,
    isSuccess,
    isPending,
    isError,
  }
}

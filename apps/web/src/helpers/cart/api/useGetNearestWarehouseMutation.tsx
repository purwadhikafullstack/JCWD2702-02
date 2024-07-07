'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useGetNearestWarehouseMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending, isError } = useMutation({
    mutationFn: async (addressId: number) => {
      return await axiosInstanceInterceptor.post(`/carts/nearest-warehouse`, {
        addressId,
      })
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

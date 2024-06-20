'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useMainAddressMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate } = useMutation({
    mutationFn: async ({ addressId }: { addressId: number }) => {
      return await axiosInstanceInterceptor.post('/auth/user/main-address', {
        addressId,
      })
    },
    onSuccess,
    onError,
  })
  return {
    mutate,
  }
}

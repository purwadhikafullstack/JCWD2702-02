'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useDeleteAddressMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate } = useMutation({
    mutationFn: async ({ addressId }: { addressId: number }) => {
      return await axiosInstanceInterceptor.post(
        `http://localhost:8000/auth/user/delete-address?addressId=${addressId}`
      )
    },
    onSuccess,
    onError,
  })
  return {
    mutate,
  }
}

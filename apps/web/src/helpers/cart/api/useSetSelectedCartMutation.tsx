'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useSetSelectedCartMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending, isError } = useMutation({
    mutationFn: async ({
      isChecked,
      productId,
    }: {
      isChecked: any
      productId: number
    }) => {
      return await axiosInstanceInterceptor.post(
        `/carts/selected?isChecked=${isChecked}`,
        {
          productId,
        }
      )
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

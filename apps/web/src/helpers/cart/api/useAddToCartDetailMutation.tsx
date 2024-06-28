'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface IReqAddToCartMutation {
  productId: number
  qty: number
}

export const useAddToCartDetailMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending, isError } = useMutation({
    mutationFn: async ({ productId, qty }: IReqAddToCartMutation) => {
      return await axiosInstanceInterceptor.post(
        `/carts/detail?productId=${productId}`,
        {
          qty,
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

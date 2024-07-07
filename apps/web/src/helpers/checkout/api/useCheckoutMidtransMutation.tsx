'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface useCheckoutMidtransMutationProps {
  grossAmount: number
  shippingCost: number
  addressId: number
}

export const useCheckoutMidtransMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending, isError } = useMutation({
    mutationFn: async ({
      grossAmount,
      shippingCost,
      addressId,
    }: useCheckoutMidtransMutationProps) => {
      return await axiosInstanceInterceptor.post(`/order/checkout-midtrans`, {
        grossAmount,
        shippingCost,
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

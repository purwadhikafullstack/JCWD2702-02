'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'

interface IShippingCost {
  origin: string
  destination: string
  weight: number
  courier: string
}

export const useShippingCostMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending, isError } = useMutation({
    mutationFn: async ({
      origin,
      destination,
      weight,
      courier,
    }: IShippingCost) => {
      return await axiosInstance.post(
        `/raja-ongkir/shipping-cost?origin=${origin}&destination=${destination}&weight=${weight}&courier=${courier}`
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

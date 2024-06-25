'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface Address {
  recipients: string
  address: string
  province: string
  provinceId: number
  city: string
  cityId: number
  phoneNumber: string
  postalCode: string
  longitude: string
  latitude: string
}

export const useCreateUserAddressMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async ({
      recipients,
      address,
      province,
      provinceId,
      city,
      cityId,
      phoneNumber,
      postalCode,
      longitude,
      latitude,
    }: Address) => {
      return await axiosInstanceInterceptor.post('/auth/user/user-address', {
        recipients,
        address,
        province,
        provinceId,
        city,
        cityId,
        phoneNumber,
        postalCode,
        longitude,
        latitude,
      })
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isSuccess,
  }
}

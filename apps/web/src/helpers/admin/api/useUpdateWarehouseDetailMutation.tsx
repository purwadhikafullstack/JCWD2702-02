'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface IUseCreateUserMutation {
  fullname: string
  email: string
  password: string
}

interface createWarehouse {
  id: string
  name: string
  province: string
  provinceId: string
  city: string
  cityId: string
  detail: string
  postalCode: string
  longitude: string
  latitude: string
}

export const useUpdateWarehouseDetailMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async ({
      id,
      name,
      province,
      provinceId,
      city,
      cityId,
      detail,
      postalCode,
      longitude,
      latitude,
    }: createWarehouse) => {
      return await axiosInstanceInterceptor.post(
        `/auth/admin/warehouse-detail?id=${id}`,
        {
          name,
          province,
          provinceId,
          city,
          cityId,
          detail,
          postalCode,
          longitude,
          latitude,
        }
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

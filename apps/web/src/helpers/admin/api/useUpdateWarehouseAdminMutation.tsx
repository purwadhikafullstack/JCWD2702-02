'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export interface IReqAssignWarehouseAdminService {
  uid: string
  name: string
  email: string
  warehouseId: number
}

export const useUpdateWarehouseAdminMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async ({
      uid,
      name,
      email,
      warehouseId,
    }: IReqAssignWarehouseAdminService) => {
      return await axiosInstanceInterceptor.post('/auth/admin/assign-admin', {
        uid,
        name,
        email,
        warehouseId,
      })
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

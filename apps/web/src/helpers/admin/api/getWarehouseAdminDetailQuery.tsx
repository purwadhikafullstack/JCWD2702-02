import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const getWarehouseAdminDetailQuery = (adminId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['warehouse-admin=detail', adminId],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `/auth/admin/warehouse-admin-detail?adminId=${adminId}`
      )
    },
  })

  return { data, isLoading, refetch }
}

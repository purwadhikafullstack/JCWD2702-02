import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useGetWarehouseAdminQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['warehouse-admin'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(`/auth/admin/warehouse-admin`)
    },
  })

  return { data, isLoading, refetch }
}

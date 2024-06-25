import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const getWarehouseQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['warehouse'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(`/auth/admin/warehouse`)
    },
  })

  return { data, isLoading, refetch }
}

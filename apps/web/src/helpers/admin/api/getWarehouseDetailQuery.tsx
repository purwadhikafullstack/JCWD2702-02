import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const getWarehouseDetailQuery = (id: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['warehouse=detail', id],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `http://localhost:8000/auth/admin/warehouse-detail?id=${id}`
      )
    },
  })

  return { data, isLoading, refetch }
}

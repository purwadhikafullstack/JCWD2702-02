import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const getUserCartQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(`/carts`)
    },
  })

  return { data, isLoading, refetch }
}

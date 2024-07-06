import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useGetUserTransactionQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-transaction'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(`/order/user`)
    },
  })

  return { data, isLoading, refetch }
}

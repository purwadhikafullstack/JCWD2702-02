import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useGetTransactionDetailQuery = (orderId: number) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-transaction-detail', orderId],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `/order/detail?orderId=${orderId}`
      )
    },
  })

  return { data, isLoading, refetch }
}

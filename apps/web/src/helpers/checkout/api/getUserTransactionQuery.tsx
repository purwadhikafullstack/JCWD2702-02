import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useGetUserTransactionQuery = (
  page: string | number,
  status: string
) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-transaction', page, status],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `/order/user?page=${page}&status=${status}`
      )
    },
  })

  return { data, isLoading, refetch }
}

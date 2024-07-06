import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useGetUserDetailQuery = (userId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-detail', userId],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `/auth/admin/user-detail?userId=${userId}`
      )
    },
  })

  return { data, isLoading, refetch }
}

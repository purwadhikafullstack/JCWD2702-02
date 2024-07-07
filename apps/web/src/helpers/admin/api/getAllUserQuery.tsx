import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useGetAllUserQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-user'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(`/auth/admin/all-user`)
    },
  })

  return { data, isLoading, refetch }
}

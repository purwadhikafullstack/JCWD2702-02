import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useGetUserAddressQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(`/auth/user/address`, {})
    },
  })

  return { data, isLoading, refetch }
}

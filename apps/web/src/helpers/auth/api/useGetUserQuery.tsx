import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useGetUserQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get('/auth/user')
    },
  })
  return { data, isLoading }
}

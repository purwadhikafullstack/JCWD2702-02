import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'
import axios from 'axios'

export const useGetCitiesQuery = (provinceId: any) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cities', provinceId],
    queryFn: async () => {
      return await axiosInstance.get(
        `/raja-ongkir/cities?provinceId=${provinceId}`
      )
    },
  })

  return { data, isLoading, refetch }
}

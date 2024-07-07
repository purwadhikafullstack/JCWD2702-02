import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'
import axios from 'axios'

export const useGetCityDetailedQuery = (provinceId: any, cityId: any) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cities', provinceId, cityId],
    queryFn: async () => {
      return await axiosInstance.get(
        `/raja-ongkir/detail-city?provinceId=${provinceId}&cityId=${cityId}`
      )
    },
  })

  return { data, isLoading, refetch }
}

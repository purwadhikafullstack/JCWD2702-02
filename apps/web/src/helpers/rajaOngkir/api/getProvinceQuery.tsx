import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'
import axios from 'axios'

export const getProvinceQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['province'],
    queryFn: async () => {
      return await axiosInstance.get('/raja-ongkir/province')
    },
  })

  return { data, isLoading, refetch }
}

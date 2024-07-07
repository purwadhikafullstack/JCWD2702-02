import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useGetWarehouseDetailQuery = (id: string) => {
  const {
    data: warehouse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['warehouseDetail'],
    queryFn: async () => {
      const dataWarehouse = await axiosInstanceInterceptor.get(
        `/warehouse/${id}`
      )
      return dataWarehouse
    },
  })
  return { warehouse, isLoading, isError }
}

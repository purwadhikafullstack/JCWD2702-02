import { useGetWarehouseDetailQuery } from '../api/useGetWarehouseDetailQuery'

export const useGetWarehouseDetail = (id: string) => {
  const { warehouse, isLoading, isError } = useGetWarehouseDetailQuery(id)

  return {
    dataWarehouseDetail: warehouse?.data?.data,
    isLoading,
    isError,
  }
}

import { useGetWarehouseDetailQuery } from '../api/getWarehouseDetailQuery'

export const useGetWarehouseDetail = (id: string) => {
  const {
    data: dataWarehouseDetail,
    isLoading: warehouseDetailLoading,
    refetch,
  } = useGetWarehouseDetailQuery(id)

  return { dataWarehouseDetail, warehouseDetailLoading, refetch }
}

import { useGetWarehouseQuery } from '../api/getWarehouseQuery'

export const useGetWarehouse = () => {
  const {
    data: dataWarehouse,
    isLoading: warehouseLoading,
    refetch,
  } = useGetWarehouseQuery()

  return { dataWarehouse, warehouseLoading, refetch }
}

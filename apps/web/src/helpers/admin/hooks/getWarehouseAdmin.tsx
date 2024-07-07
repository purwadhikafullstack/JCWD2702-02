import { useGetWarehouseAdminQuery } from '../api/getWarehouseAdminQuery'

export const useGetWarehouseAdmin = () => {
  const {
    data: dataWarehouseAdmin,
    isLoading: warehouseAdminLoading,
    refetch,
  } = useGetWarehouseAdminQuery()

  return { dataWarehouseAdmin, warehouseAdminLoading, refetch }
}

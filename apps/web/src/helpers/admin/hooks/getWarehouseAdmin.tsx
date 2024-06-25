import { getWarehouseAdminQuery } from '../api/getWarehouseAdminQuery'

export const getWarehouseAdmin = () => {
  const {
    data: dataWarehouseAdmin,
    isLoading: warehouseAdminLoading,
    refetch,
  } = getWarehouseAdminQuery()

  return { dataWarehouseAdmin, warehouseAdminLoading, refetch }
}

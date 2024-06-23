import { getWarehouseAdminQuery } from '../api/getWarehouseAdminQuery'
import { getWarehouseQuery } from '../api/getWarehouseQuery'

export const getWarehouse = () => {
  const {
    data: dataWarehouse,
    isLoading: warehouseLoading,
    refetch,
  } = getWarehouseQuery()

  return { dataWarehouse, warehouseLoading, refetch }
}

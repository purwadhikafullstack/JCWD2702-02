import { getWarehouseAdminDetailQuery } from '../api/getWarehouseAdminDetailQuery'
import { getWarehouseDetailQuery } from '../api/getWarehouseDetailQuery'

export const getWarehouseDetail = (id: string) => {
  const {
    data: dataWarehouseDetail,
    isLoading: warehouseDetailLoading,
    refetch,
  } = getWarehouseDetailQuery(id)

  return { dataWarehouseDetail, warehouseDetailLoading, refetch }
}

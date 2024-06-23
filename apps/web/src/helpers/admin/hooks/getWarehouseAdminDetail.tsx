import { getWarehouseAdminDetailQuery } from '../api/getWarehouseAdminDetailQuery'

export const getWarehouseAdminDetail = (adminId: string) => {
  const {
    data: dataWarehouseAdminDetail,
    isLoading: warehouseAdminDetailLoading,
    refetch,
  } = getWarehouseAdminDetailQuery(adminId)

  return { dataWarehouseAdminDetail, warehouseAdminDetailLoading, refetch }
}

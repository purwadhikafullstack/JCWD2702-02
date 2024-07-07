import { useGetWarehouseAdminDetailQuery } from '../api/getWarehouseAdminDetailQuery'

export const useGetWarehouseAdminDetail = (adminId: string) => {
  const {
    data: dataWarehouseAdminDetail,
    isLoading: warehouseAdminDetailLoading,
    refetch,
  } = useGetWarehouseAdminDetailQuery(adminId)

  return { dataWarehouseAdminDetail, warehouseAdminDetailLoading, refetch }
}

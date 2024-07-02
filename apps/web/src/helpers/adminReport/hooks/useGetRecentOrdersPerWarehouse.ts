import { useGetRecentOrdersPerWarehouseQuery } from "../api/useGetRecentOrdersPerWarehouseQuery";

export const useGetRecentOrdersPerWarehouse = (warehouseId: string) => {
    const { recentOrdersPerWarehouse, refetchDataRecentOrdersPerWarehouse, isLoading } = useGetRecentOrdersPerWarehouseQuery(warehouseId);

    return {
        dataRecentOrdersPerWarehouse: recentOrdersPerWarehouse?.data?.data,
        refetchDataRecentOrdersPerWarehouse,
        isLoading
    };
}
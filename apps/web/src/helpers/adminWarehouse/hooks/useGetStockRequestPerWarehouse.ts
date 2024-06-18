import { useGetStockRequestPerWarehouseQuery } from "../api/useGetStockRequestPerWarehouseQuery";

export const useGetStockRequestPerWarehouse = (warehouseId: string) => {
    const { stockRequestPerWarehouse, refetchDataStockRequestPerWarehouse, isLoading } = useGetStockRequestPerWarehouseQuery(warehouseId);
    return {
        dataStockRequestPerWarehouse: stockRequestPerWarehouse?.data?.data,
        refetchDataStockRequestPerWarehouse,
        isLoading
    };
}
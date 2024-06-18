import { useGetStockHistoryByProductAndWarehouseQuery } from "../api/useGetStockHistoryByProductAndWarehouseQuery";

export const useGetStockHistoryByProductAndWarehouse = (productId: string, warehouseId: string) => {
    const { stockHistoryByProductAndWarehouse, refetchDataStockHistoryByProductAndWarehouse, isLoading } = useGetStockHistoryByProductAndWarehouseQuery(productId, warehouseId);
    return {
        dataStockHistoryByProductAndWarehouse: stockHistoryByProductAndWarehouse?.data?.data,
        refetchDataStockHistoryByProductAndWarehouse,
        isLoading
    }
}
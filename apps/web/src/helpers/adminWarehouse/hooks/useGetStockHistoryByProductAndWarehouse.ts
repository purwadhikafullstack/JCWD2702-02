import { useGetStockHistoryByProductAndWarehouseQuery } from "../api/useGetStockHistoryByProductAndWarehouseQuery";

export const useGetStockHistoryByProductAndWarehouse = (productId: string, warehouseId: string, monthAndYear?: string) => {
    const {
        stockHistoryByProductAndWarehouse,
        refetchDataStockHistoryByProductAndWarehouse,
        isLoading } = useGetStockHistoryByProductAndWarehouseQuery(productId, warehouseId, monthAndYear);
    return {
        dataStockHistoryByProductAndWarehouse: stockHistoryByProductAndWarehouse?.data?.data,
        refetchDataStockHistoryByProductAndWarehouse,
        isLoading
    }
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetStockHistoryByProductAndWarehouseQuery = (productId: string, warehouseId: string, monthAndYear?: string) => {
    const { data: stockHistoryByProductAndWarehouse, refetch: refetchDataStockHistoryByProductAndWarehouse, isLoading } = useQuery({
        queryKey: ["stockHistoryByProductAndWarehouse", productId, warehouseId],
        queryFn: async () => {
            const dataStockHistoryByProductAndWarehouse = await axios.get(`http://localhost:8000/warehouse/${warehouseId}/products/${productId}?${monthAndYear}`);
            return dataStockHistoryByProductAndWarehouse;
        },
    });
    return {
        stockHistoryByProductAndWarehouse,
        refetchDataStockHistoryByProductAndWarehouse,
        isLoading
    };
}
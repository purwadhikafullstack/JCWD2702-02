import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetStockHistoryByProductAndWarehouseQuery = (productId: string, warehouseId: string) => {
    const { data: stockHistoryByProductAndWarehouse, refetch: refetchDataStockHistoryByProductAndWarehouse, isLoading } = useQuery({
        queryKey: ["stockHistoryByProductAndWarehouse", productId, warehouseId],
        queryFn: async () => {
            const dataStockHistoryByProductAndWarehouse = await axios.get(`http://localhost:8000/warehouse/${warehouseId}/products/${productId}`);
            return dataStockHistoryByProductAndWarehouse;
        },
    });
    return {
        stockHistoryByProductAndWarehouse,
        refetchDataStockHistoryByProductAndWarehouse,
        isLoading
    };
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetStockRequestPerWarehouseQuery = (warehouseId: string) => {
    const { data: stockRequestPerWarehouse, refetch: refetchDataStockRequestPerWarehouse, isLoading } = useQuery({
        queryKey: ["stockRequestPerWarehouse", warehouseId],
        queryFn: async () => {
            const dataStockRequestPerWarehouse = await axios.get(`http://localhost:8000/warehouse/${warehouseId}/stock-requests`);
            return dataStockRequestPerWarehouse;
        },
    });
    return {
        stockRequestPerWarehouse,
        refetchDataStockRequestPerWarehouse,
        isLoading
    };
}
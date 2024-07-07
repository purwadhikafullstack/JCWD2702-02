import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOutgoingStockRequestPerWarehouseQuery = (warehouseId: string) => {
    const { data: outgoingStockRequestPerWarehouse, refetch: refetchDataOutgoingStockRequestPerWarehouse, isLoading } = useQuery({
        queryKey: ["outgoingStockRequestPerWarehouse", warehouseId],
        queryFn: async () => {
            const dataOutgoingStockRequestPerWarehouse = await axios.get(`http://localhost:8000/warehouse/${warehouseId}/outgoing-stock-requests`);
            return dataOutgoingStockRequestPerWarehouse;
        },
    });
    return {
        outgoingStockRequestPerWarehouse,
        refetchDataOutgoingStockRequestPerWarehouse,
        isLoading
    };
}
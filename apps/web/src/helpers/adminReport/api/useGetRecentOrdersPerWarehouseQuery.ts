import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetRecentOrdersPerWarehouseQuery = (warehouseId: string) => {
    const { data: recentOrdersPerWarehouse, refetch: refetchDataRecentOrdersPerWarehouse, isLoading } = useQuery({
        queryKey: ["recentOrdersPerWarehouse"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/report/recent-orders/${warehouseId}`);
            return res;
        },
    });
    return { recentOrdersPerWarehouse, refetchDataRecentOrdersPerWarehouse, isLoading };
}
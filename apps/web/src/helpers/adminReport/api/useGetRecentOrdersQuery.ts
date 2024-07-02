import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetRecentOrdersQuery = () => {
    const { data: recentOrders, refetch: refetchDataRecentOrders, isLoading } = useQuery({
        queryKey: ["recentOrders"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/report/recent-orders`);
            return res;
        },
    });
    return { recentOrders, refetchDataRecentOrders, isLoading };
}
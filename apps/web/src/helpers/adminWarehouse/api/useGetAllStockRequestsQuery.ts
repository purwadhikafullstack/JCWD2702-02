import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllStockRequestsQuery = () => {
    const { data: allStockRequests, refetch: refetchDataAllStockRequests, isLoading } = useQuery({
        queryKey: ["allStockRequests"],
        queryFn: async () => {
            const dataAllStockRequests = await axios.get(`http://localhost:8000/stock/stock-request`);
            return dataAllStockRequests;
        },
    });
    return { allStockRequests, refetchDataAllStockRequests, isLoading };
}
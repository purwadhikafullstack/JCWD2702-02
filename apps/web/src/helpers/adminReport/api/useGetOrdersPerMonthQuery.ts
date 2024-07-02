import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrdersPerMonthQuery = (productId?: string, categoryId?: string) => {
    const { data: ordersPerMonth, refetch: refetchDataOrdersPerMonth, isLoading } = useQuery({
        queryKey: ["ordersPerMonth"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/report/orders/month?productId=${productId}&categoryId=${categoryId}`);
            return res;
        },
    });
    return { ordersPerMonth, refetchDataOrdersPerMonth, isLoading };
}
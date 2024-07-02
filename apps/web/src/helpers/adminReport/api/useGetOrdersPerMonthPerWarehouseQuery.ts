import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrdersPerMonthPerWarehouseQuery = (warehouseId: string, categoryId?: string, productId?: string) => {
    const { data: ordersPerMonthPerWarehouse, refetch: refetchDataOrdersPerMonthPerWarehouse, isLoading } = useQuery({
        queryKey: ["ordersPerMonthPerWarehouse"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/report/orders/month/${warehouseId}?productId=${productId}&categoryId=${categoryId}`);
            return res;
        },
    });
    return { ordersPerMonthPerWarehouse, refetchDataOrdersPerMonthPerWarehouse, isLoading };
}
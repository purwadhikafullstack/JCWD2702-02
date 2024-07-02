import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPeriodRevenuesPerWarehouseQuery = (warehouseId: string) => {
    const { data: periodRevenuesPerWarehouse, refetch: refetchDataPeriodRevenuesPerWarehouse } = useQuery({
        queryKey: ["periodRevenuesPerWarehouse"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/report/period-revenues/${warehouseId}`);
            return res;
        },
    });
    return { periodRevenuesPerWarehouse, refetchDataPeriodRevenuesPerWarehouse };
}
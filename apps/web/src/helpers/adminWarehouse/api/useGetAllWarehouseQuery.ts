import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllWarehouseQuery = () => {
    const { data: warehouses, refetch: refetchDataWarehouses, isLoading } = useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => {
            const dataWarehouses = await axios.get(`http://localhost:8000/warehouse`);
            return dataWarehouses;
        },
    });
    return { warehouses, refetchDataWarehouses, isLoading };
}
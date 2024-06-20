import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWarehouseDetailQuery = (id: string) => {
    const { data: warehouse, isLoading } = useQuery({
        queryKey: ["warehouseDetail"],
        queryFn: async () => {
            const dataWarehouse = await axios.get(`http://localhost:8000/warehouse/${id}`);
            return dataWarehouse;
        },
    });
    return { warehouse, isLoading };
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProductsStockPerWarehouseQuery = (warehouseId: string, queryParams?: any) => {
    const { data: productsStockPerWarehouse, refetch: refetchDataProductsStockPerWarehouse, isLoading } = useQuery({
        queryKey: ["productsStockPerWarehouse", warehouseId],
        queryFn: async () => {
            const queryString = new URLSearchParams(queryParams).toString();
            const dataProductsStockPerWarehouse = await axios.get(`http://localhost:8000/warehouse/products/${warehouseId}?${queryString}`);
            return dataProductsStockPerWarehouse;
        },
    });
    return {
        productsStockPerWarehouse,
        refetchDataProductsStockPerWarehouse,
        isLoading
    };
}
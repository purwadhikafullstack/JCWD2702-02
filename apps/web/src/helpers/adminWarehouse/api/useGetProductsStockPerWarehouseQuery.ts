import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProductsStockPerWarehouseQuery = (warehouseId: string) => {
    const { data: productsStockPerWarehouse, refetch: refetchDataProductsStockPerWarehouse, isLoading } = useQuery({
        queryKey: ["productsStockPerWarehouse", warehouseId],
        queryFn: async () => {
            const dataProductsStockPerWarehouse = await axios.get(`http://localhost:8000/warehouse/products?warehouseId=${warehouseId}`);
            return dataProductsStockPerWarehouse;
        },
    });
    return {
        productsStockPerWarehouse,
        refetchDataProductsStockPerWarehouse,
        isLoading
    };
}
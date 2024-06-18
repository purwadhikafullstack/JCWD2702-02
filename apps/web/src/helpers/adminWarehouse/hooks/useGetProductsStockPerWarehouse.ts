import { useGetProductsStockPerWarehouseQuery } from "../api/useGetProductsStockPerWarehouseQuery";

export const useGetProductsStockPerWarehouse = (warehouseId: string) => {
    const { productsStockPerWarehouse, refetchDataProductsStockPerWarehouse, isLoading } = useGetProductsStockPerWarehouseQuery(warehouseId);
    return {
        dataProductsStockPerWarehouse: productsStockPerWarehouse?.data?.data,
        refetchDataProductsStockPerWarehouse,
        isLoading
    };
}
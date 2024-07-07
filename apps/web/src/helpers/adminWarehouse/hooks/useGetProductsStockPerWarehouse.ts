import { useGetProductsStockPerWarehouseQuery } from "../api/useGetProductsStockPerWarehouseQuery";

export const useGetProductsStockPerWarehouse = (warehouseId: string, queryParams?: any) => {
    const { productsStockPerWarehouse, refetchDataProductsStockPerWarehouse, isLoading } = useGetProductsStockPerWarehouseQuery(warehouseId, queryParams);
    return {
        totalDataProductsStockPerWarehouse: productsStockPerWarehouse?.data?.count,
        dataProductsStockPerWarehouse: productsStockPerWarehouse?.data?.data,
        refetchDataProductsStockPerWarehouse,
        isLoading
    };
}
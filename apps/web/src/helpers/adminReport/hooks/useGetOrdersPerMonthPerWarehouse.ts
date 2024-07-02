import { useGetOrdersPerMonthPerWarehouseQuery } from "../api/useGetOrdersPerMonthPerWarehouseQuery";

export const useGetOrdersPerMonthPerWarehouse = (warehouseId: string, categoryId?: string, productId?: string) => {
    const { ordersPerMonthPerWarehouse, refetchDataOrdersPerMonthPerWarehouse, isLoading } = useGetOrdersPerMonthPerWarehouseQuery(warehouseId, categoryId, productId);

    return {
        dataOrdersPerMonthPerWarehouse: ordersPerMonthPerWarehouse?.data?.data,
        refetchDataOrdersPerMonthPerWarehouse,
        isLoading
    };
}
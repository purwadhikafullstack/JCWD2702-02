import { useGetOutgoingStockRequestPerWarehouseQuery } from "../api/useGetOutgoingStockRequestPerWarehouseQuery";

export const useGetOutgoingStockRequestPerWarehouse = (warehouseId: string) => {
    const { outgoingStockRequestPerWarehouse, refetchDataOutgoingStockRequestPerWarehouse, isLoading } = useGetOutgoingStockRequestPerWarehouseQuery(warehouseId);
    return {
        dataOutgoingStockRequestPerWarehouse: outgoingStockRequestPerWarehouse?.data?.data,
        refetchDataOutgoingStockRequestPerWarehouse,
        isLoading
    }
}
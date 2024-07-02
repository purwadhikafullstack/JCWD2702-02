import { useGetPeriodRevenuesPerWarehouseQuery } from "../api/useGetPeriodRevenuesPerWarehouseQuery";

export const useGetPeriodRevenuesPerWarehouse = (warehouseId: string) => {
    const { periodRevenuesPerWarehouse, refetchDataPeriodRevenuesPerWarehouse } = useGetPeriodRevenuesPerWarehouseQuery(warehouseId);
    return { dataPeriodRevenuesPerWarehouse: periodRevenuesPerWarehouse?.data?.data, refetchDataPeriodRevenuesPerWarehouse };
}
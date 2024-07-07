import { useGetAllWarehouseQuery } from "../api/useGetAllWarehouseQuery";

export const useGetAllWarehouse = () => {
    const { warehouses, refetchDataWarehouses, isLoading } = useGetAllWarehouseQuery();

    return {
        dataWarehouses: warehouses?.data?.data,
        refetchDataWarehouses,
        isLoading
    };
}
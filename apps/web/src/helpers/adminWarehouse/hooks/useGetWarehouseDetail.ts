import { useGetWarehouseDetailQuery } from "../api/useGetWarehouseDetailQuery"

export const useGetWarehouseDetail = (id: string) => {
    const { warehouse, isLoading } = useGetWarehouseDetailQuery(id)

    return {
        dataWarehouseDetail: warehouse?.data?.data,
        isLoading
    }
}
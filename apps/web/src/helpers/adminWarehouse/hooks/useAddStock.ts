import { toast } from "react-toastify"
import { useAddStockMutation } from "../api/useAddStockMutation";
import { useGetProductsStockPerWarehouse } from "./useGetProductsStockPerWarehouse";

export const useAddStock = (warehouseId: string) => {
    const { refetchDataProductsStockPerWarehouse } = useGetProductsStockPerWarehouse(warehouseId)
    const { mutateAsync: mutationAddStock } = useAddStockMutation({
        onSuccess: (data) => {
            refetchDataProductsStockPerWarehouse()
            toast.success('Stock added successfully')
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message)
        }
    })
    return {
        mutationAddStock
    }
}
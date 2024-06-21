import { toast } from "react-toastify"
import { useReduceStockMutation } from "../api/useReduceStockMutation"
import { useGetProductsStockPerWarehouse } from "./useGetProductsStockPerWarehouse"

export const useReduceStock = (warehouseId: string) => {
    const { refetchDataProductsStockPerWarehouse } = useGetProductsStockPerWarehouse(warehouseId)
    const { mutateAsync: mutationReduceStock } = useReduceStockMutation({
        onSuccess: (data) => {
            refetchDataProductsStockPerWarehouse()
            toast.success('Stock reduced successfully')
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message)
        }
    })
    return {
        mutationReduceStock
    }
}
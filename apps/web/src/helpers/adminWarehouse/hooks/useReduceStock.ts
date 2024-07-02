import { toast } from "react-toastify"
import { useReduceStockMutation } from "../api/useReduceStockMutation"

export const useReduceStock = (warehouseId: string) => {
    const { mutateAsync: mutationReduceStock } = useReduceStockMutation({
        onSuccess: (data) => {
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
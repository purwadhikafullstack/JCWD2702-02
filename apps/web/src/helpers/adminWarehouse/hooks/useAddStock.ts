import { toast } from "react-toastify"
import { useAddStockMutation } from "../api/useAddStockMutation";

export const useAddStock = (warehouseId: string) => {
    const { mutateAsync: mutationAddStock } = useAddStockMutation({
        onSuccess: () => {
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
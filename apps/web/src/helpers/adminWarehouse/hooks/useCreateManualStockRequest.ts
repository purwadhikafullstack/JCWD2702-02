import { toast } from "react-toastify"
import { useCreateManualStockRequestMutation } from "../api/useCreateManualStockRequestMutation"

export const useCreateManualStockRequest = () => {
    const { mutateAsync: mutationCreateManualStockRequest } = useCreateManualStockRequestMutation({
        onSuccess: (data) => {
            toast.success('Manual stock request created successfully')
        },
        onError: (error: any) => {
            console.log(error.response?.data.message)
            toast.error('Failed to create manual stock request')
        }
    })
    return {
        mutationCreateManualStockRequest
    }
}
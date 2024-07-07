import { toast } from 'react-toastify'
import { useAcceptStockRequestMutation } from '../api/useAcceptStockRequestMutation'
import { useGetStockRequestPerWarehouse } from './useGetStockRequestPerWarehouse'

export const useAcceptStockRequest = (id: string) => {
    const { refetchDataStockRequestPerWarehouse } = useGetStockRequestPerWarehouse(id)
    const { mutateAsync: mutationAcceptStockRequest } = useAcceptStockRequestMutation({
        onSuccess: () => {
            toast.success('Stock request accepted')
            refetchDataStockRequestPerWarehouse()
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An error occurred while accepting the stock request';
            toast.error(errorMessage);
        }
    })

    return {
        mutationAcceptStockRequest
    }
}
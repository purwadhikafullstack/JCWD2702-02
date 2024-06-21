import { toast } from 'react-toastify'
import { useRejectStockRequestMutation } from '../api/useRejectStockRequestMutation'
import { useGetStockRequestPerWarehouse } from './useGetStockRequestPerWarehouse'

export const useRejectStockRequest = (id: string) => {
    const { refetchDataStockRequestPerWarehouse } = useGetStockRequestPerWarehouse(id)
    const { mutateAsync: mutationRejectStockRequest } = useRejectStockRequestMutation({
        onSuccess: () => {
            toast.success('Stock request rejected')
            refetchDataStockRequestPerWarehouse()
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    })

    return {
        mutationRejectStockRequest
    }
}
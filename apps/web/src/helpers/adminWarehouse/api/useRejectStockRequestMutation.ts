'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useRejectStockRequestMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (id: string) => {
            const rejectedManualStockRequest = await axios.put(`http://localhost:8000/stock/reject-stock-request/${id}`)
            return rejectedManualStockRequest
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
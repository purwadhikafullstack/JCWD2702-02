'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useAcceptStockRequestMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (id: string) => {
            const acceptedManualStockRequest = await axios.put(`http://localhost:8000/stock/accept-stock-request/${id}`)
            return acceptedManualStockRequest
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
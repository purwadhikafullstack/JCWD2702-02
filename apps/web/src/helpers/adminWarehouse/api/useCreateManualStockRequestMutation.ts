'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface ICreateManualStockRequestData {
    fromId: number
    toId: number
    productId: number
    quantity: number
}

export const useCreateManualStockRequestMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: ICreateManualStockRequestData) => {
            const createdManualStockRequest = await axios.post('http://localhost:8000/stock/manual-Stock-Request', data)
            return createdManualStockRequest
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
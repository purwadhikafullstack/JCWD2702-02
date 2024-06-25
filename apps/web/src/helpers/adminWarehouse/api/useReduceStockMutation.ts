'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface IReduceStock {
    productId: number
    quantity: number
    fromId: number
}

export const useReduceStockMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: IReduceStock) => {
            const reducedStock = await axios.post('http://localhost:8000/stock/reduce-Stock', data)
            return reducedStock
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface IAddStock {
    productId: number
    quantity: number
    toId: number
}

export const useAddStockMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: IAddStock) => {
            const addedStock = await axios.post('http://localhost:8000/stock/add-Stock', data)
            return addedStock
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
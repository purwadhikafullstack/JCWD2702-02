'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface IFormProductData {
    name: any
    description: string
    price: number
    categoryId: number
}

export const useUpdateProductMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async ({ data, id }: { data: IFormProductData, id: string }) => {
            const updatedProduct = await axios.put(`http://localhost:8000/products/${id}`, data)
            return updatedProduct
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
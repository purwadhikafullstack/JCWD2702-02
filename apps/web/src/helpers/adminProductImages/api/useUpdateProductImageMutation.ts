'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateProductImageMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async ({ data, id }: { data: {}, id: string }) => {
            const updatedProductImage = await axios.put(`http://localhost:8000/products/images/${id}`, data)
            return updatedProductImage
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
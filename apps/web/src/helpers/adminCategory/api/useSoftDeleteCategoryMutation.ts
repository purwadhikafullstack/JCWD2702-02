'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useSoftDeleteCategoryMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (id: any) => {
            await axios.delete(`http://localhost:8000/categories/${id}`).then((response) => {
                const deletedCategory = response
                onSuccess(deletedCategory)
            }).catch((error) => {
                onError(error)
            })
        },
    })

    return {
        mutateAsync
    }
}
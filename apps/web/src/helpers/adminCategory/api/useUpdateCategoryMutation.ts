'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface IFormCategoryData {
    name: string
    categoryImage: string[] | null
}

export const useUpdateCategoryMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async ({ data, id }: { data: IFormCategoryData, id: string }) => {
            const updatedCategory = await axios.patch(`http://localhost:8000/categories/${id}`, data)
            return updatedCategory
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
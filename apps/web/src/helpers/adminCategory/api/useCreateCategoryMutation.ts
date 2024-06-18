'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface IFormCategoryData {
    name: string
    categoryImage: string[] | null
}

export const useCreateCategoryMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: IFormCategoryData) => {
            const createdCategory = await axios.post('http://localhost:8000/categories', data)
            return createdCategory
        },
        onSuccess,
        onError
    })

    return {
        mutateAsync
    }
}
import { toast } from 'react-toastify'
import { useCreateCategoryMutation } from '../api/useCreateCategoryMutation'
import { useGetAllProductCategories } from '@/helpers/shop/hooks/useGetAllProductCategories'

export const useCreateCategory = () => {
    const { refetchProductCategories } = useGetAllProductCategories()
    const { mutateAsync: mutationCreateCategory } = useCreateCategoryMutation({
        onSuccess: (res) => {
            toast.success('Category created successfully')
            refetchProductCategories()
        },
        onError: (error: any) => {
            console.log(error.response?.data.message)
            toast.error('Failed to create category')
        }
    })

    return {
        mutationCreateCategory
    }
}
import { toast } from 'react-toastify'
import { useUpdateCategoryMutation } from '../api/useUpdateCategoryMutation'
import { useGetAllProductCategories } from '@/helpers/shop/hooks/useGetAllProductCategories'

export const useUpdateCategory = () => {
    const { refetchProductCategories } = useGetAllProductCategories()
    const { mutateAsync: mutationUpdateCategory } = useUpdateCategoryMutation({
        onSuccess: (res) => {
            toast.success('Category updated successfully')
            refetchProductCategories()
        },
        onError: (error: any) => {
            console.log(error.response?.data.message)
            toast.error('Failed to update category')
        }
    })

    return {
        mutationUpdateCategory
    }
}
import { toast } from 'react-toastify'
import { useUpdateProductMutation } from '../api/useUpdateProductMutation'
import { useGetProductDetail } from '@/helpers/productDetail/hooks/useGetProductDetail'

export const useUpdateProduct = (id: string) => {
    const { refetchProductDetail } = useGetProductDetail(id)
    const { mutateAsync: mutationUpdateProduct } = useUpdateProductMutation({
        onSuccess: (res) => {
            toast.success('Product updated successfully')
            refetchProductDetail()
        },
        onError: (error: any) => {
            console.log(error.response?.data.message)
            toast.error('Failed to update product')
        }
    })

    return {
        mutationUpdateProduct
    }
}
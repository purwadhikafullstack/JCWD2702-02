import { toast } from 'react-toastify'
import { useRestoreErasedProductMutation } from '../api/useRestoreErasedProductMutation'
import { useGetAllErasedProduct } from './useGetAllErasedProduct'

export const useRestoreErasedProduct = (id: string) => {
    const { refetchDataErasedProducts } = useGetAllErasedProduct()
    const { mutateAsync: mutationRestoreErasedProduct } = useRestoreErasedProductMutation({
        onSuccess: (res) => {
            toast.success("Product Restored")
            refetchDataErasedProducts()
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    })

    return {
        mutationRestoreErasedProduct
    }
}
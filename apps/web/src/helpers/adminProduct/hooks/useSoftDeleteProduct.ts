import { toast } from 'react-toastify'
import { useSoftDeleteProductMutation } from '../api/useSoftDeleteProductMutation'

export const useSoftDeleteProduct = (id: string) => {
    const { mutateAsync: mutationSoftDeleteProduct } = useSoftDeleteProductMutation({
        onSuccess: (res) => {
            toast.success("Product Erased")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    })

    return {
        mutationSoftDeleteProduct
    }
}
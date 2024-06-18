import { toast } from "react-toastify"
import { useCreateProductMutation } from "../api/useCreateProductMutation";

export const useCreateProduct = () => {
    const { mutateAsync: mutationCreateProduct } = useCreateProductMutation({
        onSuccess: (res) => {
            toast.success("Product Created")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error.response?.data.message)
        }
    })

    return {
        mutationCreateProduct
    }
}
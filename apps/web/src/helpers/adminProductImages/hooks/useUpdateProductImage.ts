import { toast } from "react-toastify";
import { useUpdateProductImageMutation } from "../api/useUpdateProductImageMutation";
import { useGetProductDetail } from "@/helpers/productDetail/hooks/useGetProductDetail";

export const useUpdateProductImage = (id: string) => {
    const { productDetail, refetchProductDetail } = useGetProductDetail(id);
    const { mutateAsync: mutationUpdateProductImage } = useUpdateProductImageMutation({
        onSuccess: (res) => {
            toast.success('Product image updated successfully')
            refetchProductDetail()
        },
        onError: (error: any) => {
            console.log(error.response?.data.message)
            toast.error('Failed to update product image')
        }
    })

    return {
        mutationUpdateProductImage
    }
}
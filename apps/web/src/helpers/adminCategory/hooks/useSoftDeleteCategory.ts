import { toast } from "react-toastify"
import { useSoftDeleteCategoryMutation } from "../api/useSoftDeleteCategoryMutation";
import { useGetAllProductCategories } from "@/helpers/shop/hooks/useGetAllProductCategories";

export const useSoftDeleteCategory = () => {
    const { refetchProductCategories } = useGetAllProductCategories()
    const { mutateAsync: mutationSoftDeleteCategory } = useSoftDeleteCategoryMutation({
        onSuccess: (res) => {
            toast.success('Category deleted successfully')
            refetchProductCategories()
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
        }
    })

    return {
        mutationSoftDeleteCategory
    }
}
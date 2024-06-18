import { useGetAllProductCategoriesQuery } from "../api/useGetAllProductCategoriesQuery";

export const useGetAllProductCategories = () => {
    const { productCategories, refetchProductCategories, isLoading } = useGetAllProductCategoriesQuery();
    return {
        dataProductCategories: productCategories?.data?.data,
        refetchProductCategories,
        isLoading
    };
}
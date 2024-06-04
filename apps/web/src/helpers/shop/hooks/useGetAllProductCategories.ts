import { useGetAllProductCategoriesQuery } from "../api/useGetAllProductCategoriesQuery";

export const useGetAllProductCategories = () => {
    const { productCategories } = useGetAllProductCategoriesQuery();
    return {
        dataProductCategories: productCategories?.data?.data
    };
}
import { useGetAllErasedProductsQuery } from "../api/useGetAllErasedProductsQuery";

export const useGetAllErasedProduct = () => {
    const { erasedProducts, refetchDataErasedProducts, isLoading } = useGetAllErasedProductsQuery();

    return {
        dataErasedProducts: erasedProducts?.data?.data,
        refetchDataErasedProducts,
        isLoading
    };
}
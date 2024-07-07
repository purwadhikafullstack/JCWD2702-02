import { useGetExistingProductsQuery } from "../api/useGetExistingProductsQuery";

export const useGetExistingProducts = () => {
    const { existingProducts, refetchDataExistingProducts, isLoading } = useGetExistingProductsQuery();
    return {
        dataExistingProducts: existingProducts?.data?.data,
        refetchDataExistingProducts,
        isLoading
    };
}
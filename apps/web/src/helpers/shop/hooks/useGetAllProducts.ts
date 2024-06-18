import { useGetAllProductsQuery } from "../api/useGetAllProductsQuery";

export const useGetAllProducts = (queryParams?: any) => {
    const { products, refetchDataProducts, isLoading } = useGetAllProductsQuery(queryParams);

    return {
        dataProducts: products?.data?.data,
        refetchDataProducts,
        isLoading
    };
}
import { useGetAllProductsQuery } from "../api/useGetAllProductsQuery";

export const useGetAllProducts = (queryParams: any) => {
    const { products } = useGetAllProductsQuery(queryParams);

    return {
        dataProducts: products?.data?.data
    };
}
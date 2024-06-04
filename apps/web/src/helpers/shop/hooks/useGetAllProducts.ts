import { useGetAllProductsQuery } from "../api/useGetAllProductsQuery";

export const useGetAllProducts = () => {
    const { products } = useGetAllProductsQuery();

    return {
        dataProducts: products?.data?.data
    };
}
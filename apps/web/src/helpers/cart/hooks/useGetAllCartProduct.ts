import { useGetAllCartProductQuery } from "../api/useGetAllCartProductQuery";

export const useGetAllCartProducts = () => {
    const { cartProducts } = useGetAllCartProductQuery()

    return {
        dataCart: cartProducts?.data?.data
    }
}
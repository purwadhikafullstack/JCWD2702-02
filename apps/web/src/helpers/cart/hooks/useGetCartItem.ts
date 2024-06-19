import { useGetCartItemQuery } from "../api/useGetCartItemQuery";

export const useGetCartDetail = (cartId: number) => {
    const { cartItem } = useGetCartItemQuery(cartId);
    return {
        cartItem: cartItem?.data?.data
    };
}
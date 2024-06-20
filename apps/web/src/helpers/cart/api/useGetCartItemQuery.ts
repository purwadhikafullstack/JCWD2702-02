import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCartItemQuery = (cartId: number) => {
    const { data: cartItem } = useQuery({
        queryKey: ["cartId"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/carts/${cartId}`);
            return res;
        },
    });
    return { cartItem };
}
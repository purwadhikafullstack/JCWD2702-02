import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCartProductQuery = () => {
    const { data: cartProducts } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/carts");
            return res;
        }
    })
    return { cartProducts };
}
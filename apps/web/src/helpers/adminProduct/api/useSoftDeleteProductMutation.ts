import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useSoftDeleteProductMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (id: string) => {
            const deletedProduct = await axios.delete(`http://localhost:8000/products/soft-delete/${id}`);
            return deletedProduct;
        },
        onSuccess,
        onError
    });

    return {
        mutateAsync
    }
}
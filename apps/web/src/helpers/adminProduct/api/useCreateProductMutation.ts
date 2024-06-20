import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateProductMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: {}) => {
            const createdProduct = await axios.post('http://localhost:8000/products/', data);
            return createdProduct;
        },
        onSuccess,
        onError
    });

    return {
        mutateAsync,
    }
}

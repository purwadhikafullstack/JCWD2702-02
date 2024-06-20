import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useRestoreErasedProductMutation = ({ onSuccess, onError }: { onSuccess: (data: any) => void | Promise<void> | ((data: any) => void), onError: (error: Error) => void }) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (id: string) => {
            const restoredProduct = await axios.patch(`http://localhost:8000/products/restore/${id}`);
            return restoredProduct;
        },
        onSuccess,
        onError
    });

    return {
        mutateAsync
    }
}
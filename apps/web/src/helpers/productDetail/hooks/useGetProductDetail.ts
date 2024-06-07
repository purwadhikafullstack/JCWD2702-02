import { useGetProductDetailQuery } from "../api/useGetProductDetailQuery";

export const useGetProductDetail = (id: string) => {
    const { productDetail } = useGetProductDetailQuery(id);
    return {
        productDetail: productDetail?.data?.data
    };
}
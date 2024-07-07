import { useGetProductDetailQuery } from "../api/useGetProductDetailQuery";

export const useGetProductDetail = (id: string) => {
    const { productDetail, refetchProductDetail } = useGetProductDetailQuery(id);
    return {
        productDetail: productDetail?.data?.data,
        refetchProductDetail
    };
}
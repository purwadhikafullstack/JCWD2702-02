import { useGetCartDetailQuery } from '../api/getCartDetailQuery'

export const useGetCartDetail = (productId: any) => {
  const {
    data: dataCartDetail,
    isLoading: CartDetailLoading,
    refetch,
  } = useGetCartDetailQuery(productId)

  return { dataCartDetail, CartDetailLoading, refetch }
}

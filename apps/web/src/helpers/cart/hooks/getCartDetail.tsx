import { getUserCartQuery } from '../api/getUserCartQuery'
import { getCartDetailQuery } from '../api/getCartDetailQuery'

export const getCartDetail = (productId: any) => {
  const {
    data: dataCartDetail,
    isLoading: CartDetailLoading,
    refetch,
  } = getCartDetailQuery(productId)

  return { dataCartDetail, CartDetailLoading, refetch }
}

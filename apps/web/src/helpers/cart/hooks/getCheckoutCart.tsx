import { getUserCartQuery } from '../api/getUserCartQuery'
import { getCheckoutCartQuery } from '../api/getCheckoutCartQuery'

export const getCheckoutCart = () => {
  const {
    data: dataCheckoutCart,
    isLoading: checkoutCartLoading,
    refetch,
  } = getCheckoutCartQuery()

  return { dataCheckoutCart, checkoutCartLoading, refetch }
}

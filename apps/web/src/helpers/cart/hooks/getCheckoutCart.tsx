import { useGetCheckoutCartQuery } from '../api/getCheckoutCartQuery'

export const useGetCheckoutCart = () => {
  const {
    data: dataCheckoutCart,
    isLoading: checkoutCartLoading,
    refetch,
  } = useGetCheckoutCartQuery()

  return { dataCheckoutCart, checkoutCartLoading, refetch }
}

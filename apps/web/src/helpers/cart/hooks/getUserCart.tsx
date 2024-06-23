import { getUserCartQuery } from '../api/getUserCartQuery'

export const getUserCart = () => {
  const {
    data: dataUserCart,
    isLoading: UserCartLoading,
    refetch,
  } = getUserCartQuery()

  return { dataUserCart, UserCartLoading, refetch }
}

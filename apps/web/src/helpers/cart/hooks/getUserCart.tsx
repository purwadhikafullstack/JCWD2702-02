import { useGetUserCartQuery } from '../api/getUserCartQuery'

export const useGetUserCart = () => {
  const {
    data: dataUserCart,
    isLoading: UserCartLoading,
    refetch,
  } = useGetUserCartQuery()

  return { dataUserCart, UserCartLoading, refetch }
}

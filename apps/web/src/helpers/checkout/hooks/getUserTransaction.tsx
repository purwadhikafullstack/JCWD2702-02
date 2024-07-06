import { useGetUserTransactionQuery } from '../api/getUserTransactionQuery'

export const useGetUserTransaction = () => {
  const {
    data: dataUserTransaction,
    isLoading: userTransactionLoading,
    refetch,
  } = useGetUserTransactionQuery()

  return { dataUserTransaction, userTransactionLoading, refetch }
}

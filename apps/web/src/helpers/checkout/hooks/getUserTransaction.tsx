import { useGetUserTransactionQuery } from '../api/getUserTransactionQuery'

export const useGetUserTransaction = (
  page: string | number,
  status: string
) => {
  const {
    data: dataUserTransaction,
    isLoading: userTransactionLoading,
    refetch,
  } = useGetUserTransactionQuery(page, status)

  return { dataUserTransaction, userTransactionLoading, refetch }
}

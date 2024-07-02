import { getUserTransactionQuery } from '../api/getUserTransactionQuery'

export const getUserTransaction = () => {
  const {
    data: dataUserTransaction,
    isLoading: userTransactionLoading,
    refetch,
  } = getUserTransactionQuery()

  return { dataUserTransaction, userTransactionLoading, refetch }
}

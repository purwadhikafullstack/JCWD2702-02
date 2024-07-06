import { useGetTransactionDetailQuery } from '../api/getTransactionDetailQuery'

export const useGetTransactionDetail = (orderId: number) => {
  const {
    data: dataTransactionDetail,
    isLoading: transactionDetailLoading,
    refetch,
  } = useGetTransactionDetailQuery(orderId)

  return { dataTransactionDetail, transactionDetailLoading, refetch }
}

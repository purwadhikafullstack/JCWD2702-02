import { useGetUserDetailQuery } from '../api/getUserDetailQuery'

export const useGetUserDetail = (userId: string) => {
  const {
    data: dataUserDetail,
    isLoading: userDetailLoading,
    refetch,
  } = useGetUserDetailQuery(userId)

  return { dataUserDetail, userDetailLoading, refetch }
}

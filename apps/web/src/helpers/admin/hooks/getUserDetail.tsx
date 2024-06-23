import { getUserDetailQuery } from '../api/getUserDetailQuery'

export const getUserDetail = (userId: string) => {
  const {
    data: dataUserDetail,
    isLoading: userDetailLoading,
    refetch,
  } = getUserDetailQuery(userId)

  return { dataUserDetail, userDetailLoading, refetch }
}

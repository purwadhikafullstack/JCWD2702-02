import { getAllUserQuery } from '../api/getAllUserQuery'

export const getAllUser = () => {
  const {
    data: dataAllUser,
    isLoading: allUserLoading,
    refetch,
  } = getAllUserQuery()

  return { dataAllUser, allUserLoading, refetch }
}

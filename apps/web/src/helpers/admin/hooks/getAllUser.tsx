import { useGetAllUserQuery } from '../api/getAllUserQuery'

export const useGetAllUser = () => {
  const {
    data: dataAllUser,
    isLoading: allUserLoading,
    refetch,
  } = useGetAllUserQuery()

  return { dataAllUser, allUserLoading, refetch }
}

import { useGetUserAddressQuery } from '../api/getUserAddressQuery'

export const useGetUserAddress = () => {
  const {
    data: dataUserAddress,
    isLoading: UserAddressLoading,
    refetch,
  } = useGetUserAddressQuery()

  return { dataUserAddress, UserAddressLoading, refetch }
}

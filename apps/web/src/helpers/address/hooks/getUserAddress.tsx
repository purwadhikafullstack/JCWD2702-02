import { getUserAddressQuery } from '../api/getUserAddressQuery'

export const getUserAddress = () => {
  const {
    data: dataUserAddress,
    isLoading: UserAddressLoading,
    refetch,
  } = getUserAddressQuery()

  return { dataUserAddress, UserAddressLoading, refetch }
}

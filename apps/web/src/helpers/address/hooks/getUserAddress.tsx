import { useGetUserAddressQuery } from '../api/getUserAddressQuery'

export const useGetUserAddress = (skip: any) => {
  console.log(skip)
  const {
    data: dataUserAddress,
    isLoading: UserAddressLoading,
    refetch,
  } = useGetUserAddressQuery()

  return { dataUserAddress, UserAddressLoading, refetch }
}

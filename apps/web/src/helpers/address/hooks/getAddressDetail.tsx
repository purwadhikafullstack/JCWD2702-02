import { useGetAddressDetailQuery } from '../api/getAddressDetailQuery'

export const useGetAddressDetail = (addressId: string) => {
  const {
    data: dataAddressDetail,
    isLoading: addressDetailLoading,
    refetch,
  } = useGetAddressDetailQuery(addressId)

  return { dataAddressDetail, addressDetailLoading, refetch }
}

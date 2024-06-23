import { getAddressDetailQuery } from '../api/getAddressDetailQuery'

export const getAddressDetail = (addressId: string) => {
  const {
    data: dataAddressDetail,
    isLoading: addressDetailLoading,
    refetch,
  } = getAddressDetailQuery(addressId)

  return { dataAddressDetail, addressDetailLoading, refetch }
}

import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const getAddressDetailQuery = (addressId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['address-detail', addressId],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `/auth/user/detail-address?addressId=${addressId}`
      )
    },
  })

  return { data, isLoading, refetch }
}

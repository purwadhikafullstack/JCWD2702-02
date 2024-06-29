import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const getCheckoutCartQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cart-checkout'],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(`/carts/checkout`)
    },
  })

  return { data, isLoading, refetch }
}

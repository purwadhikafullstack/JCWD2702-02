import { useQuery } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from './../../../config/axios/axiosInstanceInterceptor'

export const useGetCartDetailQuery = (productId: any) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cart-detail', productId],
    queryFn: async () => {
      return await axiosInstanceInterceptor.get(
        `/carts/detail?productId=${productId}`
      )
    },
  })

  return { data, isLoading, refetch }
}

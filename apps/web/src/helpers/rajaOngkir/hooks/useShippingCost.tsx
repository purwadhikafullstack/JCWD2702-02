import { toast } from 'react-toastify'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useShippingCostMutation } from '../api/useShippingCostMutation'

export const useShippingCost = () => {
  const {
    mutate: mutationShippingCost,
    data: shippingCostData,
    isSuccess,
    isPending,
    isError,
  } = useShippingCostMutation({
    onSuccess: (res: any) => {
    },
    onError: (err: any) => {
    },
  })

  return {
    mutationShippingCost,
    isSuccess,
    isPending,
    isError,
    shippingCostData,
  }
}

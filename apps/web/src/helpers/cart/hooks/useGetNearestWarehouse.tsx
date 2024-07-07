import { toast } from 'react-toastify'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useDeleteCartMutation } from '../api/useDeleteCartMutation'
import { useGetNearestWarehouseMutation } from '../api/useGetNearestWarehouseMutation'

export const useGetNearestWarehouse = () => {
  const {
    mutate: mutationGetNearestWarehouse,
    data: nearestWarehouseData,
    isSuccess,
    isPending,
    isError,
  } = useGetNearestWarehouseMutation({
    onSuccess: (res: any) => {
    },
    onError: (err: any) => {
    },
  })

  return {
    mutationGetNearestWarehouse,
    isSuccess,
    isPending,
    isError,
    nearestWarehouseData,
  }
}

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
      //   console.log(res)
      //   toast.success(res.data.message, {
      //     position: 'top-right',
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'colored',
      //     transition: Slide,
      //   })
    },
    onError: (err: any) => {
      //   console.log(err)
      //   toast.error(err.response.data.message, {
      //     position: 'top-right',
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'colored',
      //     transition: Slide,
      //   })
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

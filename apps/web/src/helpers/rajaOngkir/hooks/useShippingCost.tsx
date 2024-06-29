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
      console.log(res)
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
      console.log(err)
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
    mutationShippingCost,
    isSuccess,
    isPending,
    isError,
    shippingCostData,
  }
}

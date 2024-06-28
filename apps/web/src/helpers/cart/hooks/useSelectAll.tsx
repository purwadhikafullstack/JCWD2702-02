import { toast } from 'react-toastify'
import { Slide, Zoom, Flip, Bounce } from 'react-toastify'
import { useDeleteCartMutation } from '../api/useDeleteCartMutation'
import { useSetSelectedCartMutation } from '../api/useSetSelectedCartMutation'
import { getUserCart } from './getUserCart'
import { useSelectAllMutation } from '../api/useSelectAllMutation'

export const useSelectAll = () => {
  const { refetch } = getUserCart()
  const {
    mutate: mutationSelectedAll,
    data: dataRegister,
    isSuccess,
    isPending,
    isError,
  } = useSelectAllMutation({
    onSuccess: (res: any) => {
      refetch()
    },
    onError: (err: any) => {},
  })

  return {
    mutationSelectedAll,
    isSuccess,
    isPending,
    isError,
  }
}

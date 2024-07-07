import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'
import { useUpdateWarehouseAdminMutation } from '../api/useUpdateWarehouseAdminMutation'

export const useUpdateWarehouseAdmin = () => {
  const {
    mutate: mutationUpdateWarehouseAdmin,
    isSuccess,
    data: warehouseAdminUpdateData,
  } = useUpdateWarehouseAdminMutation({
    onSuccess: (res: any) => {
      toast.success(res.data.message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      })
    },
    onError: (err: any) => {
    },
  })

  return {
    mutationUpdateWarehouseAdmin,
    isSuccess,
    warehouseAdminUpdateData,
  }
}

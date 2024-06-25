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
      console.log(res)
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
      console.log(err)
      //   toast.error(err.response.data.message, {
      //     position: 'top-right',
      //     autoClose: 1500,
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
    mutationUpdateWarehouseAdmin,
    isSuccess,
    warehouseAdminUpdateData,
  }
}

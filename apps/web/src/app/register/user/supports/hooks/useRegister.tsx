import { useRegisterMutation } from '../api/useRegisterMutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export const useRegister = () => {
  const navigate = useRouter()
  const {
    mutate: mutationRegister,
    data: dataRegister,
    isSuccess,
    isPending,
  } = useRegisterMutation({
    onSuccess: (res: any) => {
      console.log(res)
    },
    onError: (err: any) => {
      console.log(err)
    },
  })

  return {
    mutationRegister,
    dataRegister,
    isSuccess,
    isPending,
  }
}

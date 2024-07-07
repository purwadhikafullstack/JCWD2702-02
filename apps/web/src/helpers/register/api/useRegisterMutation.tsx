'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface IReqUseRegisterMutation {
  fullname: string
  email: string
}

export const useRegisterMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending } = useMutation({
    mutationFn: async ({ fullname, email }: IReqUseRegisterMutation) => {
      return await axios.post('http://localhost:8000/auth/register', {
        fullname,
        email,
      })
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    data,
    isSuccess,
    isPending,
  }
}

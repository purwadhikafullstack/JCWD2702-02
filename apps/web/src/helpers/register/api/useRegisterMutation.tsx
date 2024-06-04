'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface IReqUseRegisterMutation {
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

export const useRegisterMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending } = useMutation({
    mutationFn: async ({
      fullname,
      email,
      password,
      confirmPassword,
    }: IReqUseRegisterMutation) => {
      return await axios.post('http://localhost:8000/auth/register', {
        fullname,
        email,
        password,
        confirmPassword,
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

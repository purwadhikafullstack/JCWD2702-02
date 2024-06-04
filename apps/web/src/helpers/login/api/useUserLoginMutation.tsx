'use client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface IReqUseRegisterMutation {
  email: string
  password: string
}

export const useUserLoginMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, password }: IReqUseRegisterMutation) => {
      return await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      })
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isPending,
  }
}

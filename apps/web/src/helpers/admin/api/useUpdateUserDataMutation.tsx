'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

interface IUseCreateUserMutation {
  userId: string
  fullname: string
  email: string
  verify: string
}

export const useUpdateUserDataMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async ({
      userId,
      fullname,
      email,
      verify,
    }: IUseCreateUserMutation) => {
      return await axiosInstanceInterceptor.post(
        `http://localhost:8000/auth/admin/update-user?userId=${userId}`,
        {
          fullname,
          email,
          verify,
        }
      )
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isSuccess,
    data,
  }
}

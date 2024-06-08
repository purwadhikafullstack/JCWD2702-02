'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'

interface IReqUpdateEmailMutation {
  accesstoken: string
  email: string
  confirmEmail: string
}

export const useUpdateEmailMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      accesstoken,
      email,
      confirmEmail,
    }: IReqUpdateEmailMutation) => {
      return await axiosInstance.post(
        '/auth/update-email',
        {
          email: email,
          confirmEmail: confirmEmail,
        },
        {
          headers: {
            accesstoken: accesstoken,
          },
        }
      )
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    isPending,
  }
}

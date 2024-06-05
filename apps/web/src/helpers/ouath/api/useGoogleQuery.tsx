import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '@/config/axios/axiosInstance'
import { headers } from 'next/headers'

export const useLoginOauthMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ accesstoken }: { accesstoken: string }) => {
      return await axiosInstance.post(
        'http://localhost:8000/auth/login/oauth',
        {},
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

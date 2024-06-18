'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useUpdateUserImageMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ data }: { data: any }) => {
      console.log('AAAA')
      return await axiosInstanceInterceptor.post(
        '/auth/user/image-uploader',
        data
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

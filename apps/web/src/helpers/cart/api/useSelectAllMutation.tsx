'use client'
import { useMutation } from '@tanstack/react-query'
import { axiosInstanceInterceptor } from '@/config/axios/axiosInstanceInterceptor'

export const useSelectAllMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any
  onError: any
}) => {
  const { mutate, data, isSuccess, isPending, isError } = useMutation({
    mutationFn: async ({ isChecked }: { isChecked: any }) => {
      return await axiosInstanceInterceptor.post(
        `/carts/selected-all?isChecked=${isChecked}`
      )
    },
    onSuccess,
    onError,
  })

  return {
    mutate,
    data,
    isSuccess,
    isPending,
    isError,
  }
}

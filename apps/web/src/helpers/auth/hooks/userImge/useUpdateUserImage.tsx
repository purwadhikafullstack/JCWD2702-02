'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'
import { useUpdateUserImageMutation } from '../../api/userImage/useUpdateUserImageMutation'
import { useGetUser } from '../useGetUser'

export const useUpdateUserImage = () => {
  const { refetch } = useGetUser()
  const navigate = useRouter()
  const {
    mutate: mutationUpdateUserImage,
    isPending,
    isSuccess,
  } = useUpdateUserImageMutation({
    onSuccess: (res: any) => {
      refetch()
    },
    onError: (err: any) => {
      console.log(err)
    },
  })

  return {
    mutationUpdateUserImage,
    isPending,
    isSuccess,
  }
}

'use client'
import { useGetUser } from '@/helpers/auth/hooks/useGetUser'
import { useResetPassword } from './../../../../helpers/auth/hooks/password/useResetPassword'
import { useUpdateEmailRequest } from './../../../../helpers/auth/hooks/email/useUpdatePasswordRequest'
import Image from 'next/image'
import UserModal from '../../Modal/UserUpdate'

export default function UserInfo() {
  const { dataUser } = useGetUser()
  const { mutationResetPassword } = useResetPassword()
  const { mutationUpdateEmailRequest } = useUpdateEmailRequest()

  const userInfo = dataUser?.data?.data
  const userImage = userInfo?.userImageUrl

  return (
    <div className='flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md'>
      <div className='avatar flex w-full items-center justify-center'>
        <div className='w-[200px] rounded-full'>
          {userImage ? (
            <Image
              width={100}
              height={100}
              alt='test'
              priority={true}
              src={`http://localhost:8000/${userInfo?.userImageUrl}`}
            />
          ) : (
            <Image
              width={100}
              height={100}
              alt='test'
              priority={true}
              src={`http://localhost:8000/src/public/userImage/image/DefaultUserImage.jpg`}
            />
          )}
        </div>
      </div>
      <input type='file' />
      <div className='flex text-xl font-bold'>User Information</div>
      <div className='divider w-full'></div>
      <div className='flex w-full'>
        <div className='flex w-full flex-col gap-2'>
          <div className='font-bold'>Name :</div>
          <div className='font-bold'>Email :</div>
          {userInfo?.google == 'TRUE' ? null : (
            <>
              <UserModal
                id={'reset_password'}
                link={'Reset Password'}
                header={'Confirm to Reset Password'}
                fn={mutationResetPassword}
              />
              <UserModal
                id={'update_email'}
                link={'Update Email'}
                header={'Confirm to Update Email'}
                fn={mutationUpdateEmailRequest}
              />
            </>
          )}
        </div>
        <div className='flex w-full flex-col gap-2'>
          <div>{userInfo?.fullname}</div>
          <div>{userInfo?.email}</div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useGetUser } from '@/helpers/auth/hooks/useGetUser'
import { useResetPassword } from './../../../../helpers/auth/hooks/password/useResetPassword'
import { useUpdateEmailRequest } from './../../../../helpers/auth/hooks/email/useUpdatePasswordRequest'
import Image from 'next/image'
import UserModal from '../../Modal/UserUpdate'
import { useUpdateUserImage } from '@/helpers/auth/hooks/userImge/useUpdateUserImage'
import { MdMessage, MdMail, MdLocalPhone } from 'react-icons/md'
import { toast } from 'react-toastify'

export default function UserInfo() {
  const { dataUser, refetch } = useGetUser()
  const [file, setFile]: any = useState(null)
  const { mutationResetPassword } = useResetPassword()
  const { mutationUpdateEmailRequest } = useUpdateEmailRequest()
  const { mutationUpdateUserImage, isSuccess } = useUpdateUserImage()

  const userInfo = dataUser?.data?.data
  const userImage = userInfo?.userImageUrl

  const handleFileChange = (event: any) => {
    const uploadedFile = [...event.target.files]
    setFile(uploadedFile)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const acceptedFormat = ['jpg', 'jpeg', 'webp', 'png', 'svg']
    let validator = file[0].name.split('.')

    if (
      !acceptedFormat.includes(validator[validator.length - 1].toLowerCase()) ||
      file[0].size > 1 * 1024 * 1024
    ) {
      toast.error(`Format Not Acceptable or File is too large`)
    }

    if (file) {
      const fd = new FormData()

      fd.append('userimageurl', file[0])

      mutationUpdateUserImage({
        data: fd,
      })

      setFile(null)
    }
  }

  return (
    <div className='flex h-[800px] w-full flex-col items-start justify-around rounded-md border-2 border-white bg-white p-10 shadow-md'>
      <div className='flex w-full flex-col items-center justify-center gap-3'>
        <div className='avatar mb-5 flex w-full items-center justify-center'>
          <div className='w-[200px] rounded-full'>
            {userImage ? (
              <Image
                width={100}
                height={100}
                alt='test'
                priority={true}
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${userInfo?.userImageUrl}`}
              />
            ) : (
              <Image
                width={100}
                height={100}
                alt='test'
                priority={true}
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/src/public/userImage/image/DefaultUserImage.jpg`}
              />
            )}
          </div>
        </div>
        <div className='flex w-[50%] items-center justify-center rounded-md bg-eggplant text-white'>
          <details className='collapse collapse-arrow'>
            <summary className='collapse-title flex items-center justify-center text-xl font-medium'>
              Change Image
            </summary>
            <div className='collapse-content flex items-center justify-center gap-5'>
              <input
                type='file'
                onChange={(event) => handleFileChange(event)}
                className='file-input w-full max-w-xs border-eggplant text-black'
              />
              <button
                disabled={!file}
                onClick={handleSubmit}
                className='btn border-ebony bg-ebony text-bouquet hover:border-eggplant hover:bg-second_ebony'
              >
                Submit
              </button>
            </div>
          </details>
        </div>
      </div>
      <div className='w-full'>
        <div className='divider w-full'></div>
        <div className='flex items-center justify-center text-xl font-bold'>
          User Information
        </div>
        <div className='divider w-full'></div>
      </div>
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

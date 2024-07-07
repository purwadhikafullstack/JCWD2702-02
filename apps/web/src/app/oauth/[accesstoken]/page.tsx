'use client'
import { useOauthLogin } from '@/helpers/ouath/hooks/useGoogle'
import { useRouter } from 'next/navigation'
import { useEffect, useContext } from 'react'
import { UserContext } from '@/config/context/userContext'

export default function Verification({ params }: any) {
  const accesstoken = params.accesstoken
  const { mutationOauthLogin, isPending, data } = useOauthLogin()
  const { userData }: any = useContext(UserContext)

  const navigate = useRouter()

  useEffect(() => {
    if (!userData) {
      mutationOauthLogin({ accesstoken: accesstoken })
    }
  })

  return (
    <div className='flex h-screen items-center justify-center p-[100px]'>
      <div className='flex h-[200px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
        <div className='flex w-full items-center justify-center text-[25px] font-bold'>
          Login With Google Success
        </div>

        <div className='flex w-full flex-col'>
          <button
            onClick={() => navigate.push('/')}
            type='submit'
            className='rounded-m bg-cerulean btn flex w-full justify-center bg-eggplant text-white hover:bg-hover_eggplant'
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  )
}

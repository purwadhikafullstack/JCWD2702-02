'use client'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/config/axios/axiosInstance'
import { FcGoogle } from 'react-icons/fc'

export default function GoogleSignUpButton() {
  const navigate = useRouter()

  return (
    <button
      onClick={() => {
        navigate.push('http://localhost:8000/auth/oauth/google')
      }}
      aria-label='Sign in with Google'
      className='border-button-border-light flex h-10 items-center justify-center gap-2 rounded-md border bg-white p-0.5 pr-3 hover:bg-slate-200'
    >
      <FcGoogle size={20} />
      <span className='text-google-text-gray text-sm tracking-wider'>
        Sign in with Google
      </span>
    </button>
  )
}

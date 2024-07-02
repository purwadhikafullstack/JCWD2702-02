'use client'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

export default function GoogleSignUpButton(props: any) {
  const navigate = useRouter()

  return (
    <button
      onClick={() => {
        navigate.push(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/oauth/google`
        )
      }}
      aria-label='Sign in with Google'
      className='border-button-border-light flex h-10 items-center justify-center gap-2 rounded-md border bg-white p-0.5 pr-3 hover:bg-slate-200'
    >
      <FcGoogle size={20} />
      <span className='text-sm tracking-wider text-google-text-gray'>
        {/* Sign in with Google */}
        {props.subject}
      </span>
    </button>
  )
}

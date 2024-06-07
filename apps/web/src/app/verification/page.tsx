'use client'
import { MdEmail, MdPeople } from 'react-icons/md'

export default function VerifyEmailPage() {
  return (
    <div className='flex h-fit items-center justify-center p-[100px]'>
      <div className='flex h-[500px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
        <div className='flex flex-col gap-[25px]'>
          <div className='text-[25px] font-bold'>Verify Your Account</div>
          <div className='text-[15px]'>
            Already Have Account?{' '}
            <a
              href='/login'
              className='text-eggplant hover:text-hover_eggplant underline underline-offset-2'
            >
              Login now
            </a>
          </div>
          <div className='text-[15px]'>
            Dont Have Account?{' '}
            <a
              href='/register'
              className='text-eggplant hover:text-hover_eggplant underline underline-offset-2'
            >
              Register Now
            </a>
          </div>
        </div>
        <div className='flex w-full flex-col gap-10'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center font-bold'>
              Email*
              <MdEmail />
            </div>
            <div>
              <label className='input input-bordered flex w-full items-center gap-2'>
                <input
                  type='text'
                  className='grow'
                  placeholder='Email'
                  name='email'
                />
              </label>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col'>
          <button
            type='submit'
            className='rounded-m btn bg-cerulean bg-eggplant hover:bg-hover_eggplant flex w-full justify-center text-white'
          >
            Verify
          </button>
          <div className='divider'></div>
        </div>
      </div>
    </div>
  )
}

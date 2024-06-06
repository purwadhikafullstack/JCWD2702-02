'use client'
import { useGetUser } from '@/helpers/auth/hooks/useGetUser'
import Loading from '@/components/cores/Loading'

export default function UserInfo() {
  const { dataUser } = useGetUser()

  const userInfo = dataUser?.data?.data

  return (
    <div className='flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md'>
      <div className='flex text-xl font-bold'>User Information</div>
      <div className='divider w-full'></div>
      <div className='flex w-full'>
        <div className='flex w-full flex-col gap-2'>
          <div className='font-bold'>Name :</div>
          <div className='font-bold'>Email :</div>
          <div>
            <label htmlFor='my_modal_7' className='font-bold hover:underline'>
              Reset Password
            </label>
            <input type='checkbox' id='my_modal_7' className='modal-toggle' />
            <div className='modal' role='dialog'>
              <div className='modal-box flex h-[150px] w-[300px] flex-col items-center justify-center gap-3'>
                <h3 className='text-lg font-bold'>Confirm Reset Password</h3>
                <div className='modal-action'>
                  <label
                    onClick={() => console.log('test')}
                    htmlFor='my_modal_6'
                    className='btn bg-eggplant text-white hover:bg-hover_eggplant'
                  >
                    Confirm
                  </label>
                </div>
              </div>
              <label className='modal-backdrop' htmlFor='my_modal_7'>
                Close
              </label>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-2'>
          <div>{userInfo?.fullname}</div>
          <div>{userInfo?.email}</div>
        </div>
      </div>
    </div>
  )
}

export default function UserDashboard() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex w-[50%] items-center justify-center bg-red-200'>
        <div className='flex h-[100px] w-full justify-between px-5'>
          <button>User Information</button>
          <button>Address</button>
          <button>Transaction</button>
        </div>
      </div>
    </div>
  )
}

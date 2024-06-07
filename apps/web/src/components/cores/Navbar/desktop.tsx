import Link from 'next/link'
import { MdShoppingCart } from 'react-icons/md'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/config/context/userContext'
import { useKeepLogin } from '@/helpers/login/hooks/useKeepLogin'
import { useRouter } from 'next/navigation'
import { deleteCookie } from '@/config/cookie'

export default function NavbarDesktop() {
  const { userData, setUserData }: any = useContext(UserContext)

  const navigate = useRouter()

  const { mutationKeepLogin } = useKeepLogin()

  const handleLogout = async () => {
    await deleteCookie()
    setUserData(null)
    navigate.push('/')
  }

  useEffect(() => {
    mutationKeepLogin()
  }, [userData])

  return (
    <div className='2xl:px-60 flex h-[60px] w-screen items-center justify-between border-b-2 px-3 shadow-md lg:px-10 xl:px-36'>
      <div className='flex w-[45%] justify-between text-xl lg:w-[35%]'>
        <div className='flex w-full'>
          <a href=''>Logo</a>
        </div>
        <div className='flex w-full gap-6'>
          <a href='/' className='hover:underline'>
            Home
          </a>
          <Link href='/shop' className='text-dove_gray hover:text-black'>
            Shop
          </Link>
          <a href='' className='text-dove_gray hover:text-black'>
            Item
          </a>
          <a href='' className='text-dove_gray hover:text-black'>
            Item
          </a>
        </div>
      </div>
      <div className='flex w-[35%] justify-end gap-6'>
        {userData ? (
          <>
            <div className='flex items-center justify-center rounded-full bg-concrete hover:bg-mercury md:w-[50px] lg:w-[40px]'>
              <MdShoppingCart size={20} />
            </div>
            <div className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-regent_gray bg-regent_gray font-bold text-white hover:border-bombay hover:bg-bombay'>
              {userData.firstname}
            </div>
            <div
              onClick={handleLogout}
              className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-eggplant bg-eggplant font-bold text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <div className='flex items-center justify-center rounded-full bg-concrete hover:bg-mercury md:w-[50px] lg:w-[40px]'>
              <MdShoppingCart size={20} />
            </div>
            <Link
              href={'/register'}
              className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-regent_gray bg-regent_gray font-bold text-white hover:border-bombay hover:bg-bombay'
            >
              Register
            </Link>
            <Link
              href={'/login'}
              className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-eggplant bg-eggplant font-bold text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
            >
              Login
            </Link>
          </>
        )}
        {/*  */}
      </div>
    </div>
  )
}

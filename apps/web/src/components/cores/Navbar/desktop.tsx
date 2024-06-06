import Link from 'next/link'
import { MdShoppingCart } from 'react-icons/md'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/config/context/userContext'
import { useKeepLogin } from '@/helpers/login/hooks/useKeepLogin'
import { useRouter } from 'next/navigation'
import { deleteCookie } from '@/config/cookie'

export default function NavbarDesktop() {
  const { userData, setUserData }: any = useContext(UserContext)
  const [isLogin, setIsLogin]: any = useState(false)

  const navigate = useRouter()

  const { mutationKeepLogin } = useKeepLogin()

  const handleLogout = async () => {
    await deleteCookie()
    setUserData(null)
    navigate.push('/')
    setIsLogin(false)
  }

  const handleKeepLogin = () => {
    if (isLogin == false) {
      mutationKeepLogin()
      setIsLogin(false)
    }
  }

  useEffect(() => {
    handleKeepLogin()
    setIsLogin(true)
  }, [])

  return (
    <div className='2xl:px-60 flex h-[60px] w-screen items-center justify-between border-b-2 px-3 shadow-md lg:px-10 xl:px-36'>
      <div className='flex w-[45%] justify-between text-xl lg:w-[35%]'>
        <div className='flex w-full'>
          <a href='/'>Logo</a>
        </div>
        <div className='flex w-full gap-6'>
          <a href='' className='hover:underline'>
            Home
          </a>
          <a href='' className='text-dove_gray hover:text-black'>
            Shop
          </a>
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
            <Link
              href={'/dashboard/user'}
              className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-regent_gray bg-regent_gray font-bold text-white hover:border-bombay hover:bg-bombay'
            >
              {userData.firstname}
            </Link>
            <button
              onClick={handleLogout}
              className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-eggplant bg-eggplant font-bold text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
            >
              Logout
            </button>
          </>
        ) : (
          <>
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

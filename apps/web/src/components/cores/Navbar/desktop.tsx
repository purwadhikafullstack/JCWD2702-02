import Link from 'next/link'
import { MdShoppingCart } from 'react-icons/md'
import { useContext } from 'react'
import { UserContext } from '@/config/context/userContext'
import Image from 'next/image'

export default function NavbarDesktop(props: any) {
  const { userData }: any = useContext(UserContext)

  return (
    <div className='2xl:px-[90px] flex h-[70px] w-auto items-center justify-between border-b-2 bg-white px-3 shadow-md lg:px-10 xl:px-36'>
      <div className='flex w-[45%] justify-between text-xl text-white lg:w-[90%] gap-6'>
        <div className='flex items-center'>
          <Image src='/Decorify-Logo-Eggplant.png' width={150} height={50} alt='logo' />
        </div>
        <div className='flex w-full gap-6 items-center'>
          <Link href='/' className='hover:underline text-black pt-[5px]'>
            Home
          </Link>
          <Link href='/shop' className='hover:underline text-black pt-[5px]'>
            Shop
          </Link>
          <a href='' className='hover:underline text-black pt-[5px]'>
            About
          </a>
          <a href='' className='hover:underline text-black pt-[5px]'>
            Contacts
          </a>
        </div>
      </div>
      <div className='flex w-[35%] justify-end gap-6'>
        {userData?.role == 3 ? (
          <>
            <div className='flex items-center justify-center rounded-full bg-concrete hover:bg-mercury md:w-[50px] lg:w-[40px]'>
              <Link href={`/cart`}>
                <MdShoppingCart size={20} />
              </Link>
            </div>
            <Link
              href={'/dashboard/user'}
              className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-regent_gray bg-regent_gray font-bold text-white hover:border-bombay hover:bg-bombay'
            >
              {userData.firstname}
            </Link>
            <button
              onClick={props.handleLogout}
              className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-eggplant bg-eggplant font-bold text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
            >
              Logout
            </button>
          </>
        ) : userData?.role == 1 || userData?.role == 2 ? (
          <button
            onClick={props.handleLogout}
            className='flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 border-eggplant bg-eggplant font-bold text-white hover:border-hover_eggplant hover:bg-hover_eggplant'
          >
            Logout
          </button>
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
      </div>
    </div>
  )
}

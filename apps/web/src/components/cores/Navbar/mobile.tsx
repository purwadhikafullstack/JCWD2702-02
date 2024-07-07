import { RxHamburgerMenu } from 'react-icons/rx'
import { MdClose } from 'react-icons/md'
import Link from 'next/link'
import { UserContext } from '@/config/context/userContext'
import { useKeepLogin } from '@/helpers/login/hooks/useKeepLogin'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { deleteCookie } from '@/config/cookie'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function NavbarMobile(props: any) {
  const { userData, setUserData }: any = useContext(UserContext)

  return (
    <div className='relative flex h-[60px] w-auto items-center justify-center border-b-2 px-3 shadow-md z-30'>
      <div className='absolute left-3'>
        <div className='drawer'>
          <input id='my-drawer' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content'>
            <label htmlFor='my-drawer' className='drawer-button'>
              <RxHamburgerMenu size={25} />
            </label>
          </div>
          <div className='drawer-side'>
            <label
              htmlFor='my-drawer'
              aria-label='close sidebar'
              className='drawer-overlay'
            ></label>
            <ul className='text-shuttlegray menu relative min-h-full w-80 bg-base-200 p-4 font-bold'>
              <li>
                <Image src='/Decorify-Logo-Black.png' width={150} height={40} alt='logo' />
              </li>
              <li className='pt-10 text-bouquet hover:text-eggplant'>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link className='text-bouquet hover:text-eggplant' href='/shop'>
                  Shop
                </Link>
              </li>
              <li>
                <Link className='text-bouquet hover:text-eggplant' href=''>
                  Item
                </Link>
              </li>
              <li>
                <Link className='text-bouquet hover:text-eggplant' href=''>
                  Item
                </Link>
              </li>
              <li>
                <div
                  className='text-bouquet hover:text-eggplant'
                  onClick={props.handleLogout}
                >
                  Logout
                </div>
              </li>
              <input id='my-drawer' type='checkbox' className='hidden' />
              <div className='absolute right-5'>
                <label htmlFor='my-drawer'>
                  <MdClose size={25} className='text-black' />
                </label>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div><Image src='/Decorify-Logo-Black.png' width={150} height={40} alt='logo' /></div>
    </div>
  )
}

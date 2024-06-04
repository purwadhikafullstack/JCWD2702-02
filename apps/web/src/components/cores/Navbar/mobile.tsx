import { RxHamburgerMenu } from 'react-icons/rx'
import { MdClose } from 'react-icons/md'
import Link from 'next/link'
import { UserContext } from '@/config/context/userContext'
import { useKeepLogin } from '@/helpers/login/hooks/useKeepLogin'
import { useContext } from 'react'
import { useEffect } from 'react'

export default function NavbarMobile() {
  const { userData, setUserData }: any = useContext(UserContext)

  const { mutationKeepLogin } = useKeepLogin()

  useEffect(() => {
    mutationKeepLogin()
  }, [userData])

  return (
    <div className='relative flex h-[60px] w-screen items-center justify-center border-b-2 px-3 shadow-md'>
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
              <li className='pt-10 text-bouquet hover:text-eggplant'>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link className='text-bouquet hover:text-eggplant' href=''>
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
              {/* Close button */}
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
      <div>Logo</div>
    </div>
  )
}

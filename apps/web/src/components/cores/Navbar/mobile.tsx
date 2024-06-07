import { RxHamburgerMenu } from 'react-icons/rx'
import { MdClose } from 'react-icons/md'
import Link from 'next/link'

export default function NavbarMobile() {
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
            <ul className='menu bg-base-200 text-shuttlegray relative min-h-full w-80 p-4 font-bold'>
              <li className='hover:text-eggplant text-bouquet pt-10'>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link className='hover:text-eggplant text-bouquet' href='/shop'>
                  Shop
                </Link>
              </li>
              <li>
                <Link className='hover:text-eggplant text-bouquet' href=''>
                  Item
                </Link>
              </li>
              <li>
                <Link className='hover:text-eggplant text-bouquet' href=''>
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

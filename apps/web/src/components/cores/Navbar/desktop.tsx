import Link from 'next/link'
import { MdShoppingCart } from 'react-icons/md'

export default function NavbarDesktop() {
  return (
    <div className='flex h-[60px] w-screen items-center justify-between border-b-2 px-3 shadow-md lg:px-10 xl:px-36 2xl:px-60'>
      <div className='flex w-[45%] justify-between text-xl lg:w-[35%]'>
        <div className='flex w-full'>
          <a href=''>Logo</a>
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
        <div className='bg-concrete hover:bg-mercury flex items-center justify-center rounded-full md:w-[50px] lg:w-[40px]'>
          <MdShoppingCart size={20} />
        </div>
        <Link
          href={'/register/user'}
          className='border-regent_gray hover:border-bombay hover:bg-bombay bg-regent_gray flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 font-bold text-white'
        >
          Register
        </Link>
        <button className='border-eggplant hover:border-hover_eggplant hover:bg-hover_eggplant bg-eggplant flex h-[40px] w-[100px] items-center justify-center rounded-md border-2 font-bold text-white'>
          Login
        </button>
      </div>
    </div>
  )
}

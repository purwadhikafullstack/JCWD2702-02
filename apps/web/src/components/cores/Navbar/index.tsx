import { MdShoppingCart } from 'react-icons/md'
import NavbarDesktop from './desktop'
import NavbarMobile from './mobile'

export default function Navbar() {
  return (
    <div>
      <div className='md:hidden'>
        <NavbarMobile />
      </div>
      <div className='mobile:hidden sm:hidden md:block'>
        <NavbarDesktop />
      </div>
    </div>
  )
}

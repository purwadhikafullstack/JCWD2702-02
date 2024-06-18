import { usePathname } from 'next/navigation'
import NavbarDesktop from './desktop'
import NavbarMobile from './mobile'

export default function Navbar() {
  const pathname = usePathname()

  if (pathname.includes('/admin')) return null
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

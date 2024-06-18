import { usePathname } from 'next/navigation'
import NavbarDesktop from './desktop'
import NavbarMobile from './mobile'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/config/context/userContext'
import { useKeepLogin } from '@/helpers/login/hooks/useKeepLogin'
import { useRouter } from 'next/navigation'
import { deleteCookie } from '@/config/cookie'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'

export default function Navbar() {
  const { userData, setUserData }: any = useContext(UserContext)
  const [isLogin, setIsLogin]: any = useState(false)

  const navigate = useRouter()

  const { mutationKeepLogin } = useKeepLogin()

  const handleLogout = async () => {
    localStorage.removeItem('auth')
    await deleteCookie()
    setUserData(null)
    navigate.push('/')
    setIsLogin(false)
    toast.error('Logout', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    })
  }

  const handleKeepLogin = () => {
    if (isLogin == false) {
      mutationKeepLogin()
      setIsLogin(true)
    }
  }

  useEffect(() => {
    handleKeepLogin()
  }, [])
  
  const pathname = usePathname()

  if (pathname.includes('/admin')) return null
  return (
    <div>
      <div className='md:hidden'>
        <NavbarMobile handleLogout={handleLogout} />
      </div>
      <div className='mobile:hidden sm:hidden md:block'>
        <NavbarDesktop handleLogout={handleLogout} />
      </div>
    </div>
  )
}

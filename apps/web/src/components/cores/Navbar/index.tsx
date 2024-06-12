import NavbarDesktop from './desktop'
import NavbarMobile from './mobile'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/config/context/userContext'
import { useKeepLogin } from '@/helpers/login/hooks/useKeepLogin'
import { useRouter } from 'next/navigation'
import { deleteCookie } from '@/config/cookie'

export default function Navbar() {
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
      setIsLogin(true)
    }
  }

  useEffect(() => {
    handleKeepLogin()
  }, [])
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

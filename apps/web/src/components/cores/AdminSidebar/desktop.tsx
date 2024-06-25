import Link from 'next/link'
import Image from 'next/image'
import {
  MdProductionQuantityLimits,
  MdCategory,
  MdDashboardCustomize,
  MdApps,
  MdOutlineWarehouse,
  MdOutlineLogout,
  MdAdminPanelSettings,
  MdSupervisedUserCircle,
  MdWarehouse,
} from 'react-icons/md'
import { useKeepLogin } from '@/helpers/login/hooks/useKeepLogin'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '@/config/context/userContext'
import { useRouter } from 'next/navigation'
import { deleteCookie } from '@/config/cookie'
import { toast } from 'react-toastify'
import { Slide } from 'react-toastify'

export default function AdminSidebarDesktop() {
  const { userData, setUserData }: any = useContext(UserContext)
  const [isLogin, setIsLogin] = useState(false)

  const navigate = useRouter()

  const { mutationKeepLogin } = useKeepLogin()

  const handleLogout = async () => {
    localStorage.removeItem('auth')
    await deleteCookie()
    setUserData(null)
    navigate.push('/admin')
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

  return (
    <div className='min-h-screen w-60 space-y-2 bg-eggplant p-2 text-white'>
      <Link href={'/'}>
        <div className='flex items-center justify-center'>
          <Image
            src='/DECORIFY-LOGO.png'
            alt='decorify logo'
            width={100}
            height={100}
          />
        </div>
      </Link>
      <div className='flex items-center justify-center space-x-4 p-2'>
        <div>
          <div className='text-lg font-semibold'>{userData?.fullname}</div>
        </div>
      </div>
      <div className='divide-y divide-gray-300'>
        <ul className='space-y-1 pb-4 pt-2 text-sm'>
          <li>
            <Link
              rel='noopener noreferrer'
              href={'/admin/dashboard'}
              className='flex items-center space-x-3 rounded-md p-2'
            >
              <MdDashboardCustomize className='h-5 w-5 fill-current' />
              <div className='font-sans font-semibold tracking-wide hover:text-red-600'>
                DASHBOARD
              </div>
            </Link>
          </li>
          {userData?.role == 1 ? (
            <>
              <li>
                <div className='collapse collapse-arrow'>
                  <input type='checkbox' />
                  <div className='collapse-title flex items-center space-x-3 rounded-md p-2'>
                    <MdApps className='h-5 w-5 fill-current' />
                    <div className='font-sans font-semibold tracking-wide'>
                      MANAGE
                    </div>
                  </div>
                  <div className='collapse-content'>
                    <Link
                      rel='noopener noreferrer'
                      href={'/admin/product'}
                      className='flex items-center space-x-3 rounded-md p-2'
                    >
                      <MdProductionQuantityLimits className='h-5 w-5 fill-current' />
                      <div className='font-sans font-semibold tracking-wide hover:text-red-600'>
                        PRODUCT
                      </div>
                    </Link>
                    <Link
                      rel='noopener noreferrer'
                      href={'/admin/category'}
                      className='flex items-center space-x-3 rounded-md p-2'
                    >
                      <MdCategory className='h-5 w-5 fill-current' />
                      <div className='font-sans font-semibold tracking-wide hover:text-red-600'>
                        CATEGORY
                      </div>
                    </Link>
                    <Link
                      rel='noopener noreferrer'
                      href={'/admin/manage-admin'}
                      className='flex items-center space-x-3 rounded-md p-2'
                    >
                      <MdAdminPanelSettings className='h-5 w-5 fill-current' />
                      <div className='font-sans font-semibold tracking-wide hover:text-red-600'>
                        ADMIN
                      </div>
                    </Link>
                    <Link
                      rel='noopener noreferrer'
                      href={'/admin/manage-user'}
                      className='flex items-center space-x-3 rounded-md p-2'
                    >
                      <MdSupervisedUserCircle className='h-5 w-5 fill-current' />
                      <div className='font-sans font-semibold tracking-wide hover:text-red-600'>
                        USER
                      </div>
                    </Link>
                    <Link
                      rel='noopener noreferrer'
                      href={'/admin/manage-warehouse'}
                      className='flex items-center space-x-3 rounded-md p-2'
                    >
                      <MdWarehouse className='h-5 w-5 fill-current' />
                      <div className='font-sans font-semibold tracking-wide hover:text-red-600'>
                        WAREHOUSE
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  rel='noopener noreferrer'
                  href={'/admin/warehouse'}
                  className='flex items-center space-x-3 rounded-md p-2'
                >
                  <MdOutlineWarehouse className='h-5 w-5 fill-current' />
                  <div className='font-sans font-semibold tracking-wide hover:text-red-600'>
                    WAREHOUSE
                  </div>
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <button
              onClick={handleLogout}
              className='flex items-center space-x-3 rounded-md p-2'
            >
              <MdOutlineLogout className='h-5 w-5 fill-current' />
              <div className='font-sans font-semibold tracking-wide hover:text-red-600'>
                LOGOUT
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

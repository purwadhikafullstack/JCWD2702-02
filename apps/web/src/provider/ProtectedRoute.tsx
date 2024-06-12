'use client'

import { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { UserContext } from '@/config/context/userContext'
import { getCookie } from '@/config/cookie'

export default function ProtectedRouteProvider({
  children,
}: {
  children: any
}) {
  const { userData, setUserData }: any = useContext(UserContext)

  //   const cookie = getCookie()

  //   console.log(cookie)

  // Assume This is User Role from Global Store
  const userRole = 'USER'
  // Assume User Has Token at Localstorage/Cookies
  const accessToken = true
  // AdminRoute
  const adminPermittedRoute = [
    '/admin/dashboard',
    '/admin/dashboard/product-items',
  ]
  const userPermittedRoute = ['/']

  const pathname = usePathname()
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    setLoading(true)
  }, [pathname])

  // //   useEffect(() => {
  // //     const timer = setTimeout(() => {
  // //       // Protect Admin Page
  // //       if (
  // //         accessToken &&
  // //         userRole !== 'ADMIN' &&
  // //         adminPermittedRoute.includes(pathname)
  // //       ) {
  // //         router.push('/404')
  // //       } else {
  // //         setLoading(false)
  // //       }
  // //     }, 2000)

  //     return () => clearTimeout(timer)
  //   }, [pathname, userRole])

  //   if (loading === true) {
  //     return <h1 className='text-xl font-bold'>Loading . . .</h1>
  //   }

  return <>{children}</>
}

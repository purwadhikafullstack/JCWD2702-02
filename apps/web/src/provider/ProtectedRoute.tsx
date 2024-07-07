'use client'

import { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { UserContext } from '@/config/context/userContext'
import Loading from '@/components/cores/Loading'

export default function ProtectedRouteProvider({
  children,
}: {
  children: any
}) {
  const { userData }: any = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  let accesstoken: any = localStorage.getItem('auth')
  accesstoken = JSON.parse(accesstoken)

  const userRole = userData?.role

  const accessToken = accesstoken

  const adminPermittedRoute: any = ['/admin/']
  const userPermittedRoute: any = ['/dashboard/user', '/cart', '/checkout']
  const afterLogin: any = ['/register', '/login']
  const beforeLogin: any = ['/dashboard/user', '/cart', '/checkout']

  const pathname = usePathname()
  const router = useRouter()

  useLayoutEffect(() => {
    setLoading(true)
  }, [pathname])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        accessToken &&
        userRole == 3 &&
        pathname.includes(adminPermittedRoute)
      ) {
        router.push('/')
      } else if (accessToken && afterLogin.includes(pathname)) {
        router.push('/')
      } else if (!accesstoken && beforeLogin.includes(pathname)) {
        router.push('/')
      } else if (
        accessToken &&
        (userRole == 1 || userRole == 2) &&
        userPermittedRoute.includes(pathname)
      ) {
        router.push('/')
      } else if (!accesstoken && userPermittedRoute.includes(pathname)) {
        router.push('/')
      } else if (!accesstoken && pathname.includes(adminPermittedRoute)) {
        router.push('/')
      } else {
        setLoading(false)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [pathname, userRole])

  if (loading === true) {
    return <Loading></Loading>
  }

  return <>{children}</>
}

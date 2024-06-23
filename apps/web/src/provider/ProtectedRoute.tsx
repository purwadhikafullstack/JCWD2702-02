'use client'

import { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { useRouter, usePathname, redirect } from 'next/navigation'
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

  // console.log(!accessToken)
  // console.log(userRole)
  //   console.log(loading)

  const adminPermittedRoute: any = ['/admin']
  const userPermittedRoute: any = ['/dashboard']

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
      } else {
        setLoading(false)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [pathname, userRole])

  if (loading === true) {
    return <Loading></Loading>
  }

  return <>{children}</>
}

// export default function ProtectedRouteProvider({
//   children,
// }: {
//   children: any
// }) {
//   const { userData }: any = useContext(UserContext)
//   let accesstoken: any = localStorage.getItem('auth')
//   accesstoken = JSON.parse(accesstoken)

//   const navigate = useRouter()
//   const path = usePathname()

//   const userRole = userData?.role
//   const accessToken = accesstoken?.acctkn

//   console.log(userRole)
//   console.log(accessToken)
//   console.log(!accessToken)

//   const authorizeUser = async () => {}

//   useEffect(() => {
//     authorizeUser()
//   }, [])

//   return <>{children}</>
// }

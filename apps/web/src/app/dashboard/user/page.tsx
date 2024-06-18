'use client'
import { useContext } from 'react'
import UserSideBar from '@/components/cores/Dashboard/User/SideBar'
import { SideBarContext } from '@/config/context/sideBarContext'
import { useGetUser } from '@/helpers/auth/hooks/useGetUser'
import Loading from '@/components/cores/Loading'
import UserInfo from '@/components/cores/Dashboard/User/UserInfo'
import UserAddress from '@/components/cores/Dashboard/User/UserAddress'

export default function UserDashboard() {
  const { sideBar, setSideBar }: any = useContext(SideBarContext)
  const { isLoading } = useGetUser()

  if (isLoading) return <Loading />

  return (
    <div className='flex h-screen items-center justify-center p-[100px]'>
      <div className='flex w-[1050px] justify-between gap-10'>
        <UserSideBar></UserSideBar>
        <div className='flex w-[70%] flex-col gap-10'>
          {sideBar == 0 ? <UserInfo /> : sideBar == 1 ? <UserAddress /> : null}
        </div>
      </div>
    </div>
  )
}

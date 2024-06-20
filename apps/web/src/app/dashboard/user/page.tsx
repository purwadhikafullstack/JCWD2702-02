'use client'
import { useContext } from 'react'
import UserSideBar from '@/components/cores/Dashboard/User/SideBar'
import { SideBarContext } from '@/config/context/sideBarContext'
import { getProvince } from '@/helpers/rajaOngkir/hooks/getProvince'
import { useGetUser } from '@/helpers/auth/hooks/useGetUser'
import Loading from '@/components/cores/Loading'
import UserInfo from '@/components/cores/Dashboard/User/UserInfo'
import UserAddress from '@/components/cores/Dashboard/User/UserAddress'
import { getUserAddress } from '@/helpers/address/hooks/getUserAddress'

export default function UserDashboard() {
  const { sideBar }: any = useContext(SideBarContext)
  const { isLoading } = useGetUser()
  const { UserAddressLoading } = getUserAddress()
  const { provinceLoading } = getProvince()

  if (isLoading || provinceLoading || UserAddressLoading) return <Loading />

  return (
    <div className='flex h-fit items-center justify-center'>
      <div className='my-28 flex w-[200px] flex-col justify-between gap-10 sm:w-[500px] md:w-[700px] xl:w-[1050px]'>
        <div className='flex w-[100%] flex-col'>
          <UserSideBar></UserSideBar>
          {sideBar == 0 ? <UserInfo /> : sideBar == 1 ? <UserAddress /> : null}
        </div>
      </div>
    </div>
  )
}

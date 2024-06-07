'use client'
import {
  MdAccountCircle,
  MdWallet,
  MdListAlt,
  MdOutlineSecurity,
} from 'react-icons/md'
import { useState } from 'react'
import { SideBarContext } from '@/config/context/sideBarContext'
import { useContext } from 'react'
import Link from 'next/link'

export default function UserSideBar() {
  const { sideBar, setSideBar }: any = useContext(SideBarContext)

  return (
    <div className='flex h-[600px] w-[30%] flex-col items-start justify-start gap-4 rounded-md border-2 border-eggplant bg-eggplant p-10 text-white'>
      <button
        onClick={() => setSideBar(0)}
        className='btn flex w-full justify-start border-ebony bg-ebony text-white hover:border-ebony hover:bg-ebony hover:text-bouquet'
      >
        <MdAccountCircle size={30} />
        My Account
      </button>
      <button
        onClick={() => setSideBar(1)}
        className='btn flex w-full justify-start border-ebony bg-ebony text-white hover:border-ebony hover:bg-ebony hover:text-bouquet'
      >
        <MdOutlineSecurity size={30} />
        Security
      </button>
      <button
        onClick={() => setSideBar(2)}
        className='btn flex w-full justify-start border-ebony bg-ebony text-white hover:border-ebony hover:bg-ebony hover:text-bouquet'
      >
        <MdWallet size={30} />
        My Transaction
      </button>
    </div>
  )
}

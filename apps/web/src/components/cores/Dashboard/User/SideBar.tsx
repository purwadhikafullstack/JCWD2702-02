'use client'
import {
  MdAccountCircle,
  MdWallet,
  MdListAlt,
  MdOutlineSecurity,
  MdOutlineHome,
} from 'react-icons/md'
import { useState } from 'react'
import { SideBarContext } from '@/config/context/sideBarContext'
import { useContext } from 'react'
import Link from 'next/link'

export default function UserSideBar() {
  const { sideBar, setSideBar }: any = useContext(SideBarContext)

  const barData = ['User Information', 'Address', 'Transaction']

  return (
    <div className='flex h-full w-full items-center justify-center rounded-t-lg bg-eggplant text-white'>
      <div className='px-fit bg-pampas carousel flex h-full w-full items-center justify-center rounded-none bg-opacity-[50%] text-ebony'>
        {barData.map((x, i) => {
          return (
            <div
              key={i}
              onClick={() => setSideBar(i)}
              className='btn carousel-item btn-ghost rounded-none text-white'
            >
              {x}
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import axios from 'axios'
import WhatsOn from '@/components/Homepage/WhatsOn'

export default function Home() {
  const image: any = [
    '/carousel/cs1.webp',
    '/carousel/cs2.webp',
    '/carousel/cs3.webp',
    '/carousel/cs4.webp',
    '/carousel/cs5.webp',
    '/carousel/cs6.webp',
  ]

  return (
    <div className='flex h-max flex-col items-center justify-between px-20'>
      <div className='relative flex w-full flex-col items-center justify-between py-20 text-ebony'>
        <h1 className='flex w-[80%] justify-start text-3xl font-bold'>
          Welcome to Warehouse
        </h1>
        <h1 className='flex w-[80%] justify-center text-3xl font-bold'>
          Welcome to Warehouse
        </h1>
        <h1 className='flex w-[80%] justify-end text-3xl font-bold'>
          Welcome to Warehouse
        </h1>
      </div>
      <div className='flex w-full snap-x snap-mandatory space-x-4 overflow-x-auto'>
        {image.map((x: any, i: any) => {
          return <img key={i} src={x} alt='' className='snap-center' />
        })}
      </div>
      <WhatsOn />
    </div>
  )
}

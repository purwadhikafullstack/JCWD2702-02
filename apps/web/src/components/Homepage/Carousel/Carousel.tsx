// components/Carousel.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Carousel() {
  return (
    <div className='carousel carousel-center rounded-box'>
      <div className='carousel-item'>
        <img src='/carousel/cs1.webp' alt='Pizza' className='object-fit'/>
      </div>
    </div>
  )
}

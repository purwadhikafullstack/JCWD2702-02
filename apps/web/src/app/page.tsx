'use client'
import Image from 'next/image'
import axios from 'axios'

const test = async () => {
  try {
    const res = await axios.get('http://localhost:8000/roles')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

export default function Home() {
  return (
    <div className='flex h-screen items-center justify-center'>
      Hello
      <div onClick={test}>test</div>
    </div>
  )
}

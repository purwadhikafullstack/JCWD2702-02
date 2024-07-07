'use client'
import WhatsOn from '@/components/Homepage/WhatsOn'
import CarouselHome from '@/components/Homepage/Carousel'
import MoreIdeas from '@/components/Homepage/MoreIdeas'
import ServiceHome from '@/components/Homepage/ServiceHome'
import TopCollection from '@/components/Homepage/TopCollection'
import TopCategories from '@/components/Homepage/TopCategories'

export default function Home() {

  return (
    <div className='flex min-h-screen flex-col items-center justify-between px-5 md:px-20'>
      <CarouselHome />
      <TopCategories />
      <WhatsOn />
      <MoreIdeas />
      <TopCollection />
      <ServiceHome />
    </div>
  )
}

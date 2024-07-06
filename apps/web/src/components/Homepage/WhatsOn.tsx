import { HiArrowLongRight } from 'react-icons/hi2'
import Image from 'next/image'
export default function WhatsOn() {
  return (
    <div className='h-full w-full py-16'>
      <div className='grid place-items-center'>
        <hr className='h-[3px] w-[50px] bg-ebony' />
        <p className='text-[25px] font-bold text-eggplant'>Whats on</p>
      </div>

      <div className='flex flex-row justify-center gap-10 pt-10'>
        <div className='h-[413px] w-[380px]'>
          <Image
            src='/card/cd4.jpeg'
            className='absolute z-10 h-[228px] w-[380px]'
            alt={'Tst'}
            width={10000}
            height={10000}
          />
          <p className='h-[228px] w-[380px] translate-x-2 translate-y-2 border-[3px] border-eggplant'></p>
          <div className='flex flex-col gap-5 pt-[20px]'>
            <h1 className='h-[22px] w-[380px] text-[16px] font-bold text-eggplant'>
              Enhance Your Garden with Recycled Coffee Grounds
            </h1>
            <p className='h-[72px] pt-2 text-[13px] text-gray-500'>
              Ground coffee is naturally rich in nutrients such as potassium,
              nitrogen, and magnesium, making it an excellent choice for soil
              fertilization. In fact, coffee grounds can serve as a natural
              compost, contributing to soil health and fertility.
            </p>
            <div className='flex flex-row items-center pt-[20px] text-[13px] font-bold text-eggplant'>
              <p>SEE DETAIL</p>
              <HiArrowLongRight
                size={20}
                className='ml-5 transition-all ease-linear hover:translate-x-2'
              />
            </div>
          </div>
        </div>
        <div className='h-[413px] w-[380px]'>
          <Image
            src='/card/cd5.jpeg'
            className='absolute z-10 h-[228px] w-[380px]'
            alt={'Tst'}
            width={1000}
            height={1000}
          />
          <p className='h-[228px] w-[380px] translate-x-2 translate-y-2 border-[3px] border-eggplant'></p>
          <div className='flex flex-col gap-5 pt-[20px]'>
            <h1 className='h-[22px] w-[380px] text-[16px] font-bold text-eggplant'>
              Elevate Furniture: Brand of the Year for Two Consecutive Years
            </h1>
            <p className='h-[72px] pt-2 text-[13px] text-gray-500'>
              We are proud to announce that Elevate Furniture has been honored
              as Brand of the Year in the Home Furnishings category at the
              prestigious World Branding Awards for 2023-2024. This marks the
              second consecutive year that Elevate Furniture has achieved this
              distinguished recognition.
            </p>
            <div className='flex flex-row items-center pt-[20px] text-[13px] font-bold text-eggplant'>
              <p>SEE DETAIL</p>
              <HiArrowLongRight
                size={20}
                className='ml-5 transition-all ease-linear hover:translate-x-2'
              />
            </div>
          </div>
        </div>
        <div className='h-[413px] w-[380px]'>
          <Image
            src='/card/cd3.jpeg'
            className='absolute z-10 h-[228px] w-[380px]'
            alt={'Tst'}
            width={380}
            height={413}
          />
          <p className='h-[228px] w-[380px] translate-x-2 translate-y-2 border-[3px] border-eggplant'></p>
          <div className='flex flex-col gap-5 pt-[20px]'>
            <h1 className='h-[22px] w-[380px] text-[16px] font-bold text-eggplant'>
              Furniture Meets Entertainment: Prestige Furniture x Netflix
              Collaboration
            </h1>
            <p className='h-[72px] pt-2 text-[13px] text-gray-500'>
              Discover the exclusive Prestige Furniture x Netflix collaboration,
              bringing you two unique collections inspired by the elegance of
              Gadis Kretek.
            </p>
            <div className='flex flex-row items-center pt-[20px] text-[13px] font-bold text-eggplant'>
              <p>SEE DETAIL</p>
              <HiArrowLongRight
                size={20}
                className='ml-5 transition-all ease-linear hover:translate-x-2'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full justify-center pt-10'>
        <button className='border-2 border-eggplant p-3 font-bold text-eggplant hover:border-white hover:bg-eggplant hover:text-white'>
          more info
        </button>
      </div>
    </div>
  )
}

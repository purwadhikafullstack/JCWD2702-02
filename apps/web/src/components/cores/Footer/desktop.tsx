import { MdMessage, MdMail, MdLocalPhone } from 'react-icons/md'

export default function FooterDekstop() {
  return (
    <div className='bg-ebony flex flex-col items-center justify-center'>
      <div className='flex h-[300px] items-center justify-center pb-[16px] pt-[40px] font-[16px] text-white'>
        <div className='-mx-[15px] flex h-[90%] w-[1150px] items-center justify-between'>
          <div className='flex h-full w-[200px] flex-col items-stretch justify-start px-[15px] py-[25px]'>
            <div className='mb-[16px]'>Useful Links</div>
            <div className='flex flex-col'>
              <a
                href=''
                className='text-bouquet hover:text-eggplant hover:underline'
              >
                Home
              </a>
              <a
                href=''
                className='text-bouquet hover:text-eggplant hover:underline'
              >
                About Us
              </a>
              <a
                href=''
                className='text-bouquet hover:text-eggplant hover:underline'
              >
                Products
              </a>
              <a
                href=''
                className='text-bouquet hover:text-eggplant hover:underline'
              >
                Service
              </a>
              <a
                href=''
                className='text-bouquet hover:text-eggplant hover:underline'
              >
                Legal
              </a>
              <a
                href=''
                className='text-bouquet hover:text-eggplant hover:underline'
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className='flex h-full w-[500px] flex-col items-stretch justify-start px-[15px] py-[25px]'>
            <div className='mb-[16px]'>About Us</div>
            <div className='flex flex-col gap-2'>
              <p>
                We are a team of passionate people whose goal is to improve
                everyone's life through disruptive products. We build great
                products to solve your business problems.
              </p>
              <p>
                Our products are designed for small to medium size companies
                willing to optimize their performance.
              </p>
            </div>
          </div>
          <div className='flex h-full w-[380px] flex-col items-stretch justify-start px-[15px] py-[25px] pl-28'>
            <div className='mb-[16px]'>Connect With Us</div>
            <div className='flex flex-col gap-2'>
              <a href='' className='flex items-center gap-2'>
                <MdMessage size={18} />
                <p className='text-bouquet hover:text-eggplant hover:underline'>
                  Contact Us
                </p>
              </a>
              <a href='' className='flex items-center gap-2'>
                <MdMail size={18} />
                <p className='text-bouquet hover:text-eggplant hover:underline'>
                  email@email.com
                </p>
              </a>
              <a href='' className='flex items-center gap-2'>
                <MdLocalPhone size={18} />
                <p className='text-bouquet hover:text-eggplant hover:underline'>
                  +1 (650) 555-0111
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-second_ebony text-bombay flex h-fit w-full items-center justify-center py-3'>
        Copyright © Burnog
      </div>
    </div>
  )
}

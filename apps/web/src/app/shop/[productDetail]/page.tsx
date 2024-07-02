'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { useGetProductDetail } from "@/helpers/productDetail/hooks/useGetProductDetail";
import Image from "next/image";
import { IProductDetail } from "@/helpers/productDetail/ProductDetailTypes";
import SearchBox from "@/components/shop/SearchBox";
import { FaShoppingCart, FaMinus, FaPlus, FaFacebookF, FaLinkedin, FaWhatsapp, FaPinterest, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "@/config/context/cartContext";
import { useAddToCart } from "@/helpers/cart/hooks/useAddToCart";
import ActiveImageModal from "@/components/shop/ActiveImageModal";
import Head from "next/head";
import HeadComponentMeta from "@/components/cores/Head";

export default function ProductDetail({
  params,
}: {
  params: { productDetail: string }
}) {
  const navigate = useRouter()

  const { productDetail } = useGetProductDetail(params.productDetail)
  const [activeImg, setActiveImg] = useState<string | null>(null)

  const [quantity, setQuantity] = useState(1)
  const { cartData, setCartData }: any = useContext(CartContext)
  const { mutationAddToCart, isError } = useAddToCart()
  const [showModal, setShowModal] = useState(false)

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  useEffect(() => {
    if (productDetail?.productImages) {
      setActiveImg(productDetail.productImages[0].productUrl)
    }
  }, [productDetail])

  const handleActiveImageClick = () => {
    if (activeImg) {
      setShowModal(true)
    }
  }
  
   const handleCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    setTimeout(() => {
      if (isError == true) navigate.push('/login')
    }, 1000)
  }, [isError])

    return (
        <div className="bg-[#ffffff] mt-8 mb-8 min-h-screen w-auto px-4 lg:px-8">
            <HeadComponentMeta title={productDetail?.products.name} description="Product detail page, see all product descriptions on this page" keywords="product, shop, ecommerce" />
            <div className="flex flex-col lg:flex-row mx-[50px] justify-center items-center">
                <div className="flex flex-col flex-shrink-0 lg:mr-8 lg:w-[45%] justify-center">
                    <div className="mb-4 flex justify-center">
                        <SearchBox showAdditionalFilters={false} applyFilters={() => { }} initialSearchParams={{}} refetchDataProducts={() => { }} />
                    </div>
                </div>
                <div className="flex flex-col lg:w-[55%] lg:justify-center">
                    <div className="mb-4 flex gap-3 items-start lg:items-center">
                        <div className="text-[#34222f] font-semibold">{productDetail?.products.Categories.name}</div>/<div>{productDetail?.products.name}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row mx-[50px] justify-center">
                <div className="flex flex-col flex-shrink-0 lg:mr-8 lg:w-[45%]">
                    <div className="flex flex-col gap-[15px] items-center">
                        {activeImg && (
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${activeImg}`} key={activeImg} className="aspect-square object-cover rounded-xl shadow-lg cursor-pointer" alt="image" width={450} height={450} onClick={handleActiveImageClick} />
                        )}
                        <div className="flex flex-row justify-start gap-2 flex-wrap">
                            {productDetail?.productImages?.map((image: IProductDetail, index: number) => (
                                <div key={index} onClick={() => setActiveImg(image.productUrl)} className="w-24 h-24 rounded-xl cursor-pointer mb-2">
                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${image.productUrl}`} className="w-[100px] h-[100px] object-cover rounded-xl" alt="image" width={1000} height={1000} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        <div className='mt-[20px] flex flex-col gap-[10px] lg:mt-[60px] lg:w-[55%]'>
          <div className='mb-4 flex flex-col'>
            <div className='text-[32px] font-bold'>
              {productDetail?.products.name}
            </div>
            <hr />
            <div className='my-[10px] flex text-wrap text-[16px] text-gray-500'>
              {productDetail?.products.description}
            </div>
            <div className='text-[32px] font-bold'>
              {productDetail?.products.price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
            <div className='mt-4 flex items-center gap-10'>
              <div className='flex items-center'>
                <button
                  onClick={handleDecrement}
                  className='rounded-l-md bg-gray-200 px-4 py-2 text-gray-700'
                >
                  <FaMinus />
                </button>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className='w-20 appearance-none border-gray-200 py-2 text-center focus:border-blue-300 focus:outline-none focus:ring'
                />
                <button
                  onClick={handleIncrement}
                  className='rounded-r-md bg-gray-200 px-4 py-2 text-gray-700'
                >
                  <FaPlus />
                </button>
              </div>
              <div className='font-medium text-gray-500'>
                Stock left: {productDetail?.totalStockAllWarehouse}
              </div>
              <button
                onClick={() =>
                  mutationAddToCart({
                    productId: Number(params.productDetail),
                    qty: Number(quantity),
                  })
                }
                className={`flex h-[30px] w-[200px] items-center justify-center gap-5 rounded-md border-2 border-eggplant bg-eggplant text-[14px] font-medium text-white hover:border-hover_eggplant hover:bg-hover_eggplant lg:h-[40px] lg:text-[16px] ${productDetail?.totalStockAllWarehouse <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                // disabled={productDetail?.totalStockAllWarehouse <= 0}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
          <div className='flex w-auto text-gray-500 lg:w-[600px] lg:text-[16px]'>
            <div className='flex w-[20%] items-center justify-center lg:w-[10%]'>
              <IoShieldCheckmarkOutline size={26} />
            </div>
            <div className='flex w-[80%] flex-col'>
              <div className='flex flex-wrap'>
                All purchases through Decorify are covered by Buyer Protection.
              </div>
              <div className='text-[10px] underline'>Learn-more</div>
            </div>
          </div>
          <hr />
          <div className='flex flex-col justify-between lg:flex-row'>
            <div className='text-gray-500'>
              <button className='underline'>Terms and Condition</button>
              <div>30-day money-back guarantee</div>
              <div>Shipping: 2-3 Business Days</div>
            </div>
            <div className='mt-[10px] flex items-start justify-start gap-3 lg:mt-0 lg:items-end lg:justify-end'>
              <FaFacebookF
                size={24}
                className='cursor-pointer duration-300 hover:scale-150'
                color='#3b5999'
              />
              <FaXTwitter
                size={24}
                className='cursor-pointer duration-300 hover:scale-150'
                color='#60afee'
              />
              <FaLinkedin
                size={24}
                className='cursor-pointer duration-300 hover:scale-150'
                color='#0077b5'
              />
              <FaWhatsapp
                size={24}
                className='cursor-pointer duration-300 hover:scale-150'
                color='#27d366'
              />
              <FaPinterest
                size={24}
                className='cursor-pointer duration-300 hover:scale-150'
                color='#c8232c'
              />
              <FaEnvelope
                size={24}
                className='cursor-pointer duration-300 hover:scale-150'
                color='#65435c'
              />
            </div>
          </div>
        </div>
      </div>
          {showModal && activeImg && <ActiveImageModal src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${activeImg}`} alt="Product Image" onClose={handleCloseModal} />}  
    </div>
  )
}

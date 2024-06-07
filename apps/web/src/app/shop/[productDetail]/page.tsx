'use client'
import { useState, useEffect } from "react";
import { useGetProductDetail } from "@/helpers/productDetail/hooks/useGetProductDetail";
import Image from "next/image";
import { IProductDetail } from "@/helpers/productDetail/ProductDetailTypes";
import SearchBox from "@/components/cores/SearchBox";
import { FaShoppingCart, FaMinus, FaPlus, FaFacebookF, FaLinkedin, FaWhatsapp, FaPinterest, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export default function ProductDetail({ params }: { params: { productDetail: string } }) {
    const { productDetail } = useGetProductDetail(params.productDetail);
    const [activeImg, setActiveImg] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        if (productDetail?.productImages) {
            setActiveImg(productDetail.productImages[0].productUrl);
        }
    }, [productDetail]);

    return (
        <div className="bg-[#ffffff] mt-8 mb-8 min-h-screen w-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row mx-[50px] justify-center items-center">
                <div className="flex flex-col flex-shrink-0 lg:mr-8 lg:w-[45%] justify-center">
                    <div className="mb-4 flex justify-center">
                        <SearchBox showAdditionalFilters={false} applyFilters={() => { }} initialSearchParams={{}} />
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
                        {activeImg && (<Image src={`http://localhost:8000/${activeImg}`} key={activeImg} className="aspect-square object-cover rounded-xl shadow-lg" alt="image" width={450} height={450} />)}
                        <div className="flex flex-row justify-start gap-2 flex-wrap">
                            {productDetail?.productImages?.map((image: IProductDetail, index: number) => (
                                <div key={index} onClick={() => setActiveImg(image.productUrl)} className="w-24 h-24 rounded-xl cursor-pointer mb-2">
                                    <Image src={`http://localhost:8000/${image.productUrl}`} className="w-[100px] h-[100px] object-cover rounded-xl" alt="image" width={1000} height={1000} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:mt-[60px] mt-[20px] lg:w-[55%] gap-[10px]">
                    <div className="mb-4 flex flex-col">
                        <div className="text-[32px] font-bold">
                            {productDetail?.products.name}
                        </div>
                        <hr />
                        <div className="flex text-wrap text-gray-500 text-[16px] my-[10px]">
                            {productDetail?.products.description}
                        </div>
                        <div className="text-[32px] font-bold">
                            {productDetail?.products.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                        </div>
                        <div className="flex gap-10 mt-4 items-center">
                            <div className="flex items-center">
                                <button onClick={handleDecrement} className="bg-gray-200 text-gray-700 rounded-l-md px-4 py-2">
                                    <FaMinus />
                                </button>
                                <input value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="appearance-none w-20 text-center py-2 focus:outline-none focus:ring focus:border-blue-300 border-gray-200" />
                                <button onClick={handleIncrement} className="bg-gray-200 text-gray-700 rounded-r-md px-4 py-2" >
                                    <FaPlus />
                                </button>
                            </div>
                            <button className='border-eggplant hover:border-hover_eggplant hover:bg-hover_eggplant bg-eggplant lg:text-[16px] text-[14px] flex h-[30px] lg:h-[40px] w-[200px] items-center justify-center gap-5 rounded-md border-2 font-medium text-white'>
                                <FaShoppingCart /> Add to Cart
                            </button>
                        </div>
                    </div>
                    <div className="flex lg:text-[16px] text-gray-500 w-auto lg:w-[600px]">
                        <div className="flex items-center justify-center w-[20%] lg:w-[10%]">
                            <IoShieldCheckmarkOutline size={26} />
                        </div>
                        <div className="flex flex-col w-[80%]">
                            <div className="flex flex-wrap">
                                All purchases through Decorify are covered by Buyer Protection.
                            </div>
                            <div className="underline text-[10px]">
                                Learn-more
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between flex-col lg:flex-row">
                        <div className="text-gray-500">
                            <button className="underline">Terms and Condition</button>
                            <div>30-day money-back guarantee</div>
                            <div>Shipping: 2-3 Business Days</div>
                        </div>
                        <div className="flex justify-start items-start lg:justify-end lg:items-end gap-3 lg:mt-0 mt-[10px]">
                            <FaFacebookF size={24} className="cursor-pointer hover:scale-150 duration-300" color="#3b5999" />
                            <FaXTwitter size={24} className="cursor-pointer hover:scale-150 duration-300" color="#60afee" />
                            <FaLinkedin size={24} className="cursor-pointer hover:scale-150 duration-300" color="#0077b5" />
                            <FaWhatsapp size={24} className="cursor-pointer hover:scale-150 duration-300" color="#27d366" />
                            <FaPinterest size={24} className="cursor-pointer hover:scale-150 duration-300" color="#c8232c" />
                            <FaEnvelope size={24} className="cursor-pointer hover:scale-150 duration-300" color="#65435c" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

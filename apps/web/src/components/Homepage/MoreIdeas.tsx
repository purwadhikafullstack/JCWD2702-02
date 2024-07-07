import Image from "next/image"
import Link from "next/link"

export default function MoreIdeas() {
    return (
        <div className="flex flex-col items-center pt-[30px] pb-[100px]">
            <hr className='h-[3px] w-[50px] bg-ebony' />
            <div className="flex text-eggplant text-center font-bold text-[25px] pb-[3%]">
                More ideas and inspiration
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-3 w-full px-5 md:px-0">
                <div className="w-full md:w-[50%]">
                    <Image
                        src="/MoreIdeas-1.webp"
                        alt="image"
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover"
                    />
                    <div className="pt-5 text-gray-800">
                        Get ready to watch the product solution in action!
                    </div>
                    <Link href="https://www.ikea.co.id/en/popular-on-social-media">
                        <div className="bg-black text-white text-[14px] m-3 rounded-full w-[200px] h-[30px] flex justify-center items-center">
                            Watch Now
                        </div>
                    </Link>
                </div>
                <div className="w-full md:w-[50%]">
                    <Image
                        src="/MoreIdeas-2.webp"
                        alt="image"
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover"
                    />
                    <div className="pt-5 text-gray-800">
                        Explore our range of products designed for smarter spending
                    </div>
                    <Link href="/shop">
                        <div className="bg-black text-white text-[14px] m-3 rounded-full w-[250px] h-[30px] flex justify-center items-center">
                            Let&apos;s explore the products
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

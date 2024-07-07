import React from "react";
import Image from "next/image";
import { IProductCategoryCard } from "./types";

export default function ProductCategoryCard({ name, image }: IProductCategoryCard) {
    return (
        <div className="flex gap-[10px] justify-between items-center bg-[#f5f4f4] px-[10px] rounded-lg w-[200px]">
            <div className="flex justify-center items-center">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${image}`} alt="image" className="w-[30px] h-[30px]" width={1000} height={1000} />
            </div>
            <div className="text-[#34222f] font-bold my-[10px]">
                {name}
            </div>
            <hr />
        </div>
    )
}
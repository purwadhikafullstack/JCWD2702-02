import React from "react";
import Image from "next/image";
import { IProductCard } from "./types";

export default function ProductCard({ name, price, image }: IProductCard) {
    return (
        <div className="flex flex-col px-[10px]">
            <div className="mx-auto w-[250px] h-[250px] flex justify-center items-center">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${image}`} alt="image" width={230} height={230} />
            </div>
            <div className="text-[#704b66] hover:text-[#362531] font-bold my-2">
                {name}
            </div>
            <div className="font-medium text-[#212529] my-2">
                {price}
            </div>
            <hr />
        </div>
    );
}

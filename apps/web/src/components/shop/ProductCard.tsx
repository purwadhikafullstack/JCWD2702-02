import React from "react";
import Image from "next/image";
import { IProductCard } from "./types";

export default function ProductCard({ name, price, image }: IProductCard) {
    return (
        <div>
            <div>
                <Image src={`http://localhost:8000/${image}`} alt="image" width={230} height={230} />
            </div>
            <div className="text-[#34222f] font-bold my-[10px]">
                {name}
            </div>
            <div className="font-medium text-[#212529] my-[10px]">
                {price}
            </div>
            <hr />
        </div>
    )
}
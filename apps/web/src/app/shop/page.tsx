'use client';
import ProductCard from "@/components/shop/ProductCard";
import { useGetAllProducts } from "../../helpers/shop/hooks/useGetAllProducts";
import { useGetAllProductCategories } from "../../helpers/shop/hooks/useGetAllProductCategories";

export default function ShopPage() {
    const { dataProducts } = useGetAllProducts();
    const { dataProductCategories } = useGetAllProductCategories();

    return (
        <div className="bg-[#ffffff] mt-[5%] min-h-screen w-auto">
            {/* DIV SEARCHBOX AND SORT */}
            <div className="flex lg:flex-nowrap md:flex-nowrap flex-wrap my-[1%] mx-[50px] gap-10 justify-center w-auto">
                SEARCH BOX AND SORT
            </div>
            {/* DIV CATEGORIES FILTER */}
            <div className="flex lg:flex-nowrap md:flex-col flex-wrap my-[1%] mx-[50px] gap-3 justify-center w-auto">
                <div className="flex justify-center">
                    CATEGORY FILTER
                </div>
                <div className="flex gap-10 justify-center">
                    {dataProductCategories?.map((item: any, index: number) => (
                        <button key={index} className="text-[#34222f] font-bold my-[10px]">
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* DIV PRODUCTS CARD */}
            <div className="flex flex-wrap mx-[10px] lg:mx-[100px] gap-[50px] justify-center">
                {dataProducts?.map((item: any, index: number) => (
                    <ProductCard name={item.name} price={item.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })} image={item.oneImage.productUrl} key={index} />
                ))}
            </div>
        </div>
    );
}

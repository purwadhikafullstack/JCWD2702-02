'use client';
import ProductCard from "@/components/shop/ProductCard";
import ProductCategoryCard from "@/components/shop/ProductCategoryCard";
import { IDataProducts, IDataProductCategories } from "@/components/shop/types";
import { useGetAllProducts } from "../../helpers/shop/hooks/useGetAllProducts";
import { useGetAllProductCategories } from "../../helpers/shop/hooks/useGetAllProductCategories";
import SearchBox from "@/components/cores/SearchBox";
import Link from "next/link";

export default function ShopPage({ searchParams }: { searchParams: { search: string, sort: string, minPrice: string, maxPrice: string } }) {
    console.log(searchParams)
    const { search = '', sort = '', minPrice = '', maxPrice = '' } = searchParams;
    const query = { search, sort, minPrice, maxPrice };
    const { dataProducts } = useGetAllProducts(query);
    const { dataProductCategories } = useGetAllProductCategories();

    return (
        <div className="bg-[#ffffff] mt-[3%] mb-[5%] min-h-screen w-auto">
            <div className="flex lg:flex-nowrap flex-wrap my-[1%] mx-[50px] gap-3 justify-center w-auto">
                <SearchBox showAdditionalFilters={true} applyFilters={() => { }} initialSearchParams={searchParams} />
            </div>
            <div className="flex md:flex-nowrap flex-wrap my-[1%] mx-[10px] lg:mx-[100px] gap-[10px] justify-center w-auto">
                <div className="flex gap-[10px] justify-start lg:mx-[60px] overflow-x-scroll">
                    {dataProductCategories?.map((item: IDataProductCategories, index: number) => (
                        <button key={index} className="text-[#34222f] font-bold my-[10px]">
                            <ProductCategoryCard name={item.name} image={item.categoryUrl} />
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap mx-[10px] lg:mx-[100px] gap-[20px] justify-center">
                {dataProducts?.map((item: IDataProducts, index: number) => (
                    <Link key={index} href={`/shop/${item.id}`}>
                        <ProductCard name={item.name} price={item.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })} image={item.oneImage.productUrl} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

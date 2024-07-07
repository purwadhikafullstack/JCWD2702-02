'use client';
import { useEffect } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { IDataProducts } from "@/components/shop/types";
import { useGetAllProducts } from "../../helpers/shop/hooks/useGetAllProducts";
import SearchBox from "@/components/shop/SearchBox";
import Link from "next/link";
import HeadComponentMeta from "@/components/cores/Head";

export default function ShopPage({ searchParams }: { searchParams: { search: string, sort: string, minPrice: string, maxPrice: string, categoryId: string, page: string } }) {
    const { search = '', sort = '', minPrice = '', maxPrice = '', categoryId = '', page = '1' } = searchParams;
    const query = { search, sort, minPrice, maxPrice, categoryId, page };

    const { dataProducts, refetchDataProducts, isLoading, totalProducts } = useGetAllProducts(query);

    useEffect(() => {
        setTimeout(() => {
            refetchDataProducts();
        }, 10);
    }, [search, sort, minPrice, maxPrice, categoryId, page, refetchDataProducts]);

    return (
        <>
            <div className="bg-[#ffffff] mt-[0%] mb-[5%] min-h-screen w-auto">
                <HeadComponentMeta title="Shop" description="Shop all products" keywords="shop, all products" />
                <div className="flex lg:flex-nowrap flex-wrap my-[1%] gap-3 justify-center w-auto">
                    <SearchBox showAdditionalFilters={true} applyFilters={() => { }} initialSearchParams={searchParams} refetchDataProducts={refetchDataProducts} totalProducts={totalProducts} />
                </div>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-start mt-[80px] min-h-screen">
                        <span className="loading loading-bars loading-lg h-[50px]"></span>
                        <div>Searching For Products...</div>
                    </div>
                ) : dataProducts && dataProducts.length > 0 ? (
                    <div className="flex flex-wrap mx-[10px] lg:mx-[100px] lg:pl-[120px] gap-[20px] justify-center lg:justify-start">
                        {dataProducts.map((item: IDataProducts, index: number) => (
                            <Link key={index} href={`/shop/${item.id}`}>
                                <ProductCard name={item.name} price={item.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })} image={item.oneImage.productUrl} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-start mt-[80px] min-h-screen text-center">
                        <div className="text-2xl text-gray-500 font-semibold">No product defined</div>
                        <div className="text-gray-500">No product defined in this category.</div>
                    </div>
                )}
            </div>
        </>
    );
}

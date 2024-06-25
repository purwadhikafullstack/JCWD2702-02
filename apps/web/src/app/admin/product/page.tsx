'use client'
import { useState, useEffect } from "react";
import { useGetAllProducts } from "@/helpers/shop/hooks/useGetAllProducts";
import AdminProductCard from "@/components/admin/AdminProductCard";
import Link from "next/link";
import { IoMdCreate } from "react-icons/io";
import { FaTrashRestoreAlt } from "react-icons/fa";
import SearchAndFilterBoxAdminProduct from "@/components/admin/SearchBoxAdminProduct";

export default function Adminproduct({ searchParams }: { searchParams: { search: string, sort: string, minPrice: string, maxPrice: string, categoryId: string, page: string } }) {
    const { search = '', sort = '', categoryId = '', page = '1' } = searchParams;
    const query = { search, sort, categoryId, page };
    const { dataProducts, refetchDataProducts, isLoading, totalProducts } = useGetAllProducts(query);

    useEffect(() => {
        setTimeout(() => {
            refetchDataProducts();
        }, 10);
    }, [search, sort, categoryId, page]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-semibold">Products</div>
                <div className="flex gap-5">
                    <Link href="/admin/product/restore-product">
                        <button className="flex items-center gap-2 text-black bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">
                            <FaTrashRestoreAlt />Restore
                        </button>
                    </Link>
                    <Link href="/admin/product/create-product">
                        <button onClick={() => refetchDataProducts()} className="flex gap-2 items-center text-white bg-eggplant px-4 py-2 rounded-md hover:bg-hover_eggplant transition-colors">
                            <IoMdCreate />Create New Product
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mb-4">
                <SearchAndFilterBoxAdminProduct initialSearchParams={searchParams} refetchDataProducts={refetchDataProducts} totalProducts={totalProducts} />
            </div>
            {dataProducts && dataProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {dataProducts.map((item: any, index: number) => (
                        <AdminProductCard key={index} id={item.id} name={item.name} price={item.price} productImage={`http://localhost:8000/${item.oneImage.productUrl}`} />
                    ))}
                </div>
            ) : (
                <div>No product defined</div>
            )}
        </div>
    )
}

'use client'
import { useState, useEffect } from "react";
import { useGetAllErasedProduct } from "@/helpers/adminProduct/hooks/useGetAllErasedProduct";
import { AdminErasedProductCard } from "@/components/admin/AdminErasedProductCard";
import Head from "next/head";

export default function Adminproduct() {
    const { dataErasedProducts, refetchDataErasedProducts, isLoading } = useGetAllErasedProduct();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setTimeout(() => {
            refetchDataErasedProducts
        }, 10);
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = dataErasedProducts?.filter((product: { name: string, price: number, productImage: string, id: number }) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <Head>
                <title>Erased Products</title>
                <meta name="description" content="View erased products in the admin panel. Restore products by searching and selecting from the list." />
            </Head>
            <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-semibold">Erased Products</div>
            </div>
            <div className="mb-4">
                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className="p-2 border border-gray-300 rounded-md w-full" />
            </div>
            {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((item: any, index: number) => (
                        <AdminErasedProductCard key={index} id={item.id} name={item.name} price={item.price} productImage={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${item.ProductImages[0].productUrl}`} />
                    ))}
                </div>
            ) : (
                <div>No product to restore</div>
            )}
        </div>
    )
}

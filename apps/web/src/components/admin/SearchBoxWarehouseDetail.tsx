'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { Pagination } from 'antd';

interface Props {
    initialSearchParams: any;
    refetchDataProducts: any;
    totalProducts?: number;
    warehouseId: string;
}

export default function SearchBoxWarehouseDetail({ initialSearchParams, refetchDataProducts, totalProducts, warehouseId }: Props) {
    const router = useRouter();
    const [search, setSearch] = useState<string>(initialSearchParams?.search || '');
    const [sort, setSort] = useState<string>(initialSearchParams?.sort || '');
    const [page, setPage] = useState<number>(1);

    const updateURL = async (search: string, sort: string, page: number): Promise<void> => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        if (page) params.set('page', page.toString());
        const queryString = params.toString();
        router.push(`/admin/warehouse/${warehouseId}?${queryString}`);
    };

    const handleSearch = async (search: string) => {
        setSearch(search);
        await updateURL(search, sort, page);
        refetchDataProducts()
    };

    const handleSort = async (sort: string) => {
        setSort(sort);
        await updateURL(search, sort, page);
        refetchDataProducts()
    };

    const handlePageChange = async (page: number) => {
        setPage(page);
        await updateURL(search, sort, page);
        refetchDataProducts()
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-md shadow-sm">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-eggplant focus:border-transparent"
                    />
                    <button
                        onClick={() => handleSearch(search)}
                        className="absolute ml-[-42px] h-full px-3 py-2 bg-eggplant text-white rounded-md focus:outline-none hover:bg-hover_eggplant transition-all duration-300">
                        <FaSearch className="w-5 h-5 flex justify-center items-center" />
                    </button>
                </div>
                <select
                    value={sort}
                    onChange={(e) => handleSort(e.target.value)}
                    className="px-4 py-2 ml-[20px] h-[42px] bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-eggplant focus:border-transparent transition-all duration-300 hover:bg-gray-300">
                    <option value="featured">Featured</option>
                    <option value="stock_low_high">Stock Low - High</option>
                    <option value="stock_high_low">Stock High - Low</option>
                </select>
            </div>
            <div>
                <Pagination
                    className='flex items-end justify-end'
                    simple
                    current={page}
                    total={totalProducts}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

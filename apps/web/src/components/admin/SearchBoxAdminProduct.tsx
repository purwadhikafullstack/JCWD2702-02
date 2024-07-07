'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useGetAllProductCategories } from '@/helpers/shop/hooks/useGetAllProductCategories';
import { IDataProductCategories } from '../shop/types';
import { Pagination } from 'antd';

interface Props {
    initialSearchParams: any;
    refetchDataProducts: any;
    totalProducts?: number;
}

export default function SearchAndFilterBoxAdminProduct({ initialSearchParams, refetchDataProducts, totalProducts }: Props) {
    const router = useRouter();
    const { dataProductCategories } = useGetAllProductCategories();
    const [search, setSearch] = useState<string>(initialSearchParams?.search || '');
    const [sort, setSort] = useState<string>(initialSearchParams?.sort || '');
    const [categoryId, setCategoryId] = useState<string>(initialSearchParams?.categoryId || '');
    const [page, setPage] = useState<number>(1);

    const updateURL = async (search: string, sort: string, categoryId: string, page: number): Promise<void> => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        if (categoryId) params.set('categoryId', categoryId);
        if (page) params.set('page', page.toString());
        const queryString = params.toString();
        router.push(`/admin/product?${queryString}`);
    };

    const handleSearch = async (search: string) => {
        setSearch(search);
        setPage(1);
        await updateURL(search, sort, categoryId, 1);
        refetchDataProducts
    };

    const handleSort = async (sort: string) => {
        setSort(sort);
        setPage(1);
        await updateURL(search, sort, categoryId, 1);
        refetchDataProducts()
    };

    const handleCategory = async (categoryIdMap: string) => {
        if (categoryIdMap == categoryId) {
            setCategoryId('');
            setPage(1);
            await updateURL(search, sort, '', 1);
            refetchDataProducts()
        } else {
            setCategoryId(categoryIdMap);
            setPage(1);
            await updateURL(search, sort, categoryIdMap, 1);
            refetchDataProducts()
        }
    };

    const handlePageChange = async (page: number) => {
        setPage(page);
        await updateURL(search, sort, categoryId, page);
        refetchDataProducts();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-[30px]">
            <div className='flex w-full justify-between items-center mb-4'>
                <div className="flex w-[75%] justify-center">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search"
                        className="flex-grow p-2 pl-4 pr-10 bg-[#f3f2f2] border-0 border-transparent focus:outline-none focus:border-eggplant focus:border-4 focus:ring-0 rounded-l-lg shadow-sm transition-all duration-300" />
                    <button
                        onClick={() => handleSearch(search)}
                        className="p-2 bg-eggplant border-0 border-l border-transparent text-white focus:outline-none focus:border-eggplant focus:ring-2 focus:ring-eggplant rounded-r-lg shadow-sm transition-all duration-300 hover:bg-hover_eggplant" >
                        <FaSearch className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-end w-[25%] space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="flex items-center justify-center w-full lg:w-auto gap-3">
                        <label htmlFor="sort" className="hidden lg:inline text-gray-700 font-medium">Sort by:</label>
                        <select id="sort" value={sort} onChange={(e) => handleSort(e.target.value)}
                            className="p-2 bg-[#f3f2f2] border-0 border-transparent focus:outline-none focus:border-eggplant focus:border-4 focus:ring-0 rounded-lg shadow-sm transition-all duration-300 w-full lg:w-auto">
                            <option value="featured">Featured</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="newest">Newest Arrivals</option>
                            <option value="price_low_high">Price - Low to High</option>
                            <option value="price_high_low">Price - High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between w-full'>
                <div className="w-full mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Select Category:</label>
                    <select id="category" value={categoryId} onChange={(e) => handleCategory(e.target.value)} className="p-2 bg-[#f3f2f2] border-0 border-transparent focus:outline-none focus:border-eggplant focus:border-4 focus:ring-0 rounded-lg shadow-sm transition-all duration-300 w-full">
                        <option value="">All Categories</option>
                        {dataProductCategories?.map((item: IDataProductCategories, index: number) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='w-full max-w-lg mt-[60px]'>
                    <Pagination
                        className='flex items-end justify-end'
                        simple
                        pageSize={8}
                        current={page}
                        total={totalProducts}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

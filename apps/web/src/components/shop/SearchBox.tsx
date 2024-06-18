'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useGetAllProductCategories } from '@/helpers/shop/hooks/useGetAllProductCategories';
import { IDataProductCategories } from './types';
import ProductCategoryCard from './ProductCategoryCard';

interface Props {
    applyFilters: (minPrice: number, maxPrice: number) => void;
    showAdditionalFilters?: boolean;
    initialSearchParams: any;
    refetchDataProducts: any;
}

export default function SearchAndFilterBox({ applyFilters, showAdditionalFilters = true, initialSearchParams, refetchDataProducts }: Props) {
    const router = useRouter();
    const { dataProductCategories } = useGetAllProductCategories();
    const [search, setSearch] = useState<string>(initialSearchParams?.search || '');
    const [sort, setSort] = useState<string>(initialSearchParams?.sort || '');
    const [minPrice, setMinPrice] = useState<string>(initialSearchParams?.minPrice || '');
    const [maxPrice, setMaxPrice] = useState<string>(initialSearchParams?.maxPrice || '');
    const [categoryId, setCategoryId] = useState<string>(initialSearchParams?.categoryId || '');
    const [error, setError] = useState<string>('');

    const updateURL = async (search: string, sort: string, minPrice: string, maxPrice: string, categoryId: string): Promise<void> => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        if (categoryId) params.set('categoryId', categoryId);
        const queryString = params.toString();
        router.push(`/shop?${queryString}`);
    };

    const handleSearch = async (search: string) => {
        setSearch(search);
        await updateURL(search, sort, minPrice, maxPrice, categoryId);
        refetchDataProducts
    };

    const handleSort = async (sort: string) => {
        setSort(sort);
        await updateURL(search, sort, minPrice, maxPrice, categoryId);
        refetchDataProducts()
    };

    const handleCategory = async (categoryIdMap: string) => {
        if (categoryIdMap == categoryId) {
            setCategoryId('');
            await updateURL(search, sort, minPrice, maxPrice, '');
            refetchDataProducts()
        } else {
            setCategoryId(categoryIdMap);
            await updateURL(search, sort, minPrice, maxPrice, categoryIdMap);
            refetchDataProducts()
        }
    };

    const handleApplyFilters = async () => {
        const minPriceValue = parseFloat(minPrice);
        const maxPriceValue = parseFloat(maxPrice);

        if ((!isNaN(minPriceValue) && minPriceValue >= 0) || (!isNaN(maxPriceValue) && maxPriceValue >= 0)) {
            applyFilters(minPriceValue, maxPriceValue);
        }
        await updateURL(search, sort, minPrice || '', maxPrice || '', categoryId);
        refetchDataProducts();
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setMinPrice(value);
            setError('');
        } else {
            setError('Please enter valid numeric values for prices.');
        }
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setMaxPrice(value);
            setError('');
        } else {
            setError('Please enter valid numeric values for prices.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex w-full max-w-3xl mb-4">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search"
                    className="flex-grow p-2 pl-4 pr-10 bg-[#f3f2f2] border-0 border-transparent focus:outline-none focus:border-eggplant focus:border-4 focus:ring-0 rounded-l-full shadow-sm transition-all duration-300"
                />
                <button
                    onClick={() => handleSearch(search)}
                    className="p-2 bg-eggplant border-0 border-l border-transparent text-white focus:outline-none focus:border-eggplant focus:ring-2 focus:ring-eggplant rounded-r-full shadow-sm transition-all duration-300 hover:bg-hover_eggplant"
                >
                    <FaSearch className="w-5 h-5" />
                </button>
            </div>
            {showAdditionalFilters && (
                <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-3xl space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="flex items-center justify-center w-full lg:w-auto gap-3">
                        <label htmlFor="sort" className="hidden lg:inline text-gray-700 font-medium">Sort by:</label>
                        <select id="sort" value={sort} onChange={(e) => handleSort(e.target.value)}
                            className="p-2 bg-[#f3f2f2] border-0 border-transparent focus:outline-none focus:border-eggplant focus:border-4 focus:ring-0 rounded-full shadow-sm transition-all duration-300 w-full lg:w-auto">
                            <option value="featured">Featured</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="newest">Newest Arrivals</option>
                            <option value="price_low_high">Price - Low to High</option>
                            <option value="price_high_low">Price - High to Low</option>
                        </select>
                    </div>
                    <div className="flex items-center w-full lg:w-auto gap-3">
                        <label className="hidden lg:inline text-gray-700 font-medium">Price range:</label>
                        <input type="text" placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange}
                            className="w-full lg:w-32 p-2 bg-[#f3f2f2] border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-eggplant focus:ring-2 focus:ring-eggplant transition-all duration-300" min={0} />
                        <span>-</span>
                        <input type="text" placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange}
                            className="w-full lg:w-32 p-2 bg-[#f3f2f2] border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-eggplant focus:ring-2 focus:ring-eggplant transition-all duration-300" min={0} />
                        <button onClick={handleApplyFilters} className="px-4 py-2 bg-eggplant text-white rounded-full shadow-sm hover:bg-hover_eggplant transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-eggplant">
                            Apply
                        </button>
                    </div>
                </div>
            )}
            {showAdditionalFilters && (
                <div className="flex md:flex-nowrap flex-wrap my-[1%] mx-[10px] lg:mx-[100px] gap-[10px] justify-center w-auto">
                    <div className="flex gap-[10px] justify-start lg:mx-[60px] lg:w-[1000px] w-[400px] overflow-x-scroll">
                        {dataProductCategories?.map((item: IDataProductCategories, index: number) => (
                            <button key={index} className={`text-[#34222f] font-bold my-[10px] ${categoryId == item.id ? 'border-eggplant border-[4px] rounded-xl ' : ''}`} onClick={() => handleCategory(item.id)}>
                                <ProductCategoryCard name={item.name} image={item.categoryUrl} />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Props {
    applyFilters: (minPrice: number, maxPrice: number) => void;
    showAdditionalFilters?: boolean;
    initialSearchParams: any;
}

export default function SearchAndFilterBox({ applyFilters, showAdditionalFilters = true, initialSearchParams }: Props) {
    // console.log("search params", initialSearchParams);
    const router = useRouter();
    const [search, setSearch] = useState<string>(initialSearchParams?.search || '');
    const [sort, setSort] = useState<string>(initialSearchParams?.sort || '');
    const [minPrice, setMinPrice] = useState<string>(initialSearchParams?.minPrice || '');
    const [maxPrice, setMaxPrice] = useState<string>(initialSearchParams?.maxPrice || '');

    const updateURL = (search: string, sort: string, minPrice: string, maxPrice: string) => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        const queryString = params.toString();
        router.push(`/shop?${queryString}`);
    };

    const handleSearch = (search: string) => {
        setSearch(search);
        updateURL(search, sort, minPrice, maxPrice);
    };

    const handleSort = (sort: string) => {
        setSort(sort);
        updateURL(search, sort, minPrice, maxPrice);
    };

    const handleApplyFilters = () => {
        const minPriceValue = parseFloat(minPrice);
        const maxPriceValue = parseFloat(maxPrice);

        if (!isNaN(minPriceValue) && !isNaN(maxPriceValue) && minPriceValue >= 0 && maxPriceValue >= 0) {
            applyFilters(minPriceValue, maxPriceValue);
            updateURL(search, sort, minPrice, maxPrice);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-4">
            <div className="flex w-full max-w-3xl mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
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
                <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-3xl space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className="flex items-center w-full lg:w-auto space-x-2">
                        <label htmlFor="sort" className="hidden lg:inline text-gray-700 font-medium">Sort by:</label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => handleSort(e.target.value)}
                            className="p-2 bg-[#f3f2f2] border-0 border-transparent focus:outline-none focus:border-eggplant focus:border-4 focus:ring-0 rounded-full shadow-sm transition-all duration-300 w-full lg:w-auto"
                        >
                            <option value="featured">Featured</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="newest">Newest Arrivals</option>
                            <option value="price_low_high">Price - Low to High</option>
                            <option value="price_high_low">Price - High to Low</option>
                        </select>
                    </div>
                    <div className="flex items-center w-full lg:w-auto space-x-2">
                        <label className="hidden lg:inline text-gray-700 font-medium">Price range:</label>
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full lg:w-32 p-2 bg-[#f3f2f2] border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-eggplant focus:ring-2 focus:ring-eggplant transition-all duration-300"
                            min={0}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full lg:w-32 p-2 bg-[#f3f2f2] border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-eggplant focus:ring-2 focus:ring-eggplant transition-all duration-300"
                            min={0}
                        />
                        <button
                            onClick={handleApplyFilters}
                            className="px-4 py-2 bg-eggplant text-white rounded-full shadow-sm hover:bg-hover_eggplant transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-eggplant">
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

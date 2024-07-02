'use client';
import { useState, useEffect } from 'react';
import { useGetWarehouseDetail } from "@/helpers/adminWarehouse/hooks/useGetWarehouseDetail";
import { useGetProductsStockPerWarehouse } from "@/helpers/adminWarehouse/hooks/useGetProductsStockPerWarehouse";
import { useGetStockMutationTypeLists } from '@/helpers/adminWarehouse/hooks/useGetStockMutationTypeLists';
import { useGetStockRequestPerWarehouse } from '@/helpers/adminWarehouse/hooks/useGetStockRequestPerWarehouse';
import { useGetOutgoingStockRequestPerWarehouse } from '@/helpers/adminWarehouse/hooks/useGetOutgoingStockRequestPerWarehouse';
import { FaHistory } from "react-icons/fa";
import CreateRequestModal from '@/components/admin/CreateManualRequestModal';
import AddStockModal from '@/components/admin/AddStockModal';
import ReduceStockModal from '@/components/admin/ReduceStockModal';
import SearchBoxWarehouseDetail from '@/components/admin/SearchBoxWarehouseDetail';
import Link from "next/link";
import Head from 'next/head';

export default function WarehouseDetail({ params, searchParams }: { params: { warehouseDetail: string } } & { searchParams: { search: string, sort: string, page: string } }) {
    const { search = '', sort = '', page = '1' } = searchParams;
    const query = { search, sort, page };
    const { dataProductsStockPerWarehouse, refetchDataProductsStockPerWarehouse, totalDataProductsStockPerWarehouse } = useGetProductsStockPerWarehouse(params.warehouseDetail, query);
    const { dataWarehouseDetail } = useGetWarehouseDetail(params.warehouseDetail);
    const { dataStockMutationTypeLists } = useGetStockMutationTypeLists(params.warehouseDetail);
    const { dataStockRequestPerWarehouse } = useGetStockRequestPerWarehouse(params.warehouseDetail);
    const { dataOutgoingStockRequestPerWarehouse } = useGetOutgoingStockRequestPerWarehouse(params.warehouseDetail);
    const [isCreateRequestModalOpen, setIsCreateRequestModalOpen] = useState(false);
    const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
    const [isReduceStockModalOpen, setIsReduceStockModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [pendingIncomingRequests, setPendingIncomingRequests] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            refetchDataProductsStockPerWarehouse();
        }, 10);
    }, [search, sort, page, refetchDataProductsStockPerWarehouse]);

    useEffect(() => {
        if (dataStockRequestPerWarehouse) {
            setPendingIncomingRequests(dataStockRequestPerWarehouse.length);
        }
    }, [dataStockRequestPerWarehouse, dataOutgoingStockRequestPerWarehouse]);

    const formatDate = (dateString: string) => new Date(dateString).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const openModal = (product: { id: number, name: string }, setModalState: React.Dispatch<React.SetStateAction<boolean>>) => {
        setSelectedProduct(product);
        setModalState(true);
    };

    const closeModal = (setModalState: React.Dispatch<React.SetStateAction<boolean>>) => {
        refetchDataProductsStockPerWarehouse()
        setModalState(false);
        setSelectedProduct(null);
    };

    if (!dataProductsStockPerWarehouse || !dataWarehouseDetail || !dataStockMutationTypeLists || !dataStockRequestPerWarehouse) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <Head>
                <title>{dataWarehouseDetail?.name} - Warehouse Detail</title>
                <meta name="description" content={`Details of ${dataWarehouseDetail?.name} warehouse including stock, requests, and more.`} />
            </Head>
            <div className="flex flex-col gap-2 mb-4">
                <div className='flex justify-between'>
                    <Link href={`/admin/warehouse/${params.warehouseDetail}/dashboard`}>
                        <div className="text-2xl ml-[5px] font-semibold text-[#704b66]">
                            {dataWarehouseDetail?.name}
                        </div>
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-black ml-[5px] font-bold">
                        {dataWarehouseDetail?.province}, {dataWarehouseDetail?.city}
                    </div>
                    <div className='flex gap-3'>
                        <Link href={`/admin/warehouse/${params.warehouseDetail}/outgoing-stock-request`}>
                            <button className="relative px-4 py-2 bg-[#704b66] hover:bg-[#502b46] text-white rounded-md">To Receive</button>
                        </Link>
                        <Link href={`/admin/warehouse/${params.warehouseDetail}/stock-request`}>
                            <button className="relative px-4 py-2 bg-[#704b66] hover:bg-[#502b46] text-white rounded-md">
                                To Send
                                {pendingIncomingRequests > 0 && (
                                    <span className="absolute top-[-10px] right-[-10px] px-2 py-1 text-xs text-white bg-red-600 rounded-full">
                                        {pendingIncomingRequests}
                                    </span>
                                )}
                            </button>
                        </Link>
                    </div>
                </div>
                <SearchBoxWarehouseDetail initialSearchParams={searchParams} refetchDataProducts={refetchDataProductsStockPerWarehouse} totalProducts={totalDataProductsStockPerWarehouse} warehouseId={params.warehouseDetail} />
            </div>
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-right">On Hand Stock</th>
                        <th className="px-4 py-2 text-left">UoM</th>
                        <th className="px-4 py-2 text-left">Last Updated At</th>
                        <th className="px-4 py-2 text-left">Product Status</th>
                        <th className="px-4 py-2 text-left">Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {dataProductsStockPerWarehouse?.products.map((item: { id: number, name: string, totalStock: number, updatedAt: string, deletedAt: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2 text-right flex justify-end items-center gap-3">
                                <button onClick={() => openModal(item, setIsReduceStockModalOpen)} className="text-[20px] hover:scale-125 text-black rounded-md">-</button>
                                <div className='w-[50px]'>{item.totalStock}.00</div>
                                <button onClick={() => openModal(item, setIsAddStockModalOpen)} className="text-[20px] hover:scale-125 text-black rounded-md">+</button>
                            </td>
                            <td className="px-4 py-2 text-left">Units</td>
                            <td className="px-4 py-2 text-left">{formatDate(item.updatedAt)}</td>
                            <td className={`px-4 py-2 text-left font-bold ${item.deletedAt ? 'text-red-500' : 'text-green-500'}`}>
                                {item.deletedAt ? 'Archived' : 'Active'}
                            </td>
                            <td className="px-4 py-2 flex items-center gap-2">
                                <button onClick={() => openModal(item, setIsCreateRequestModalOpen)} className="px-2 py-1 duration-300 bg-transparent hover:bg-[#704b66] hover:border-black hover:text-white text-[#704b66] border-2 border-[#704b66] rounded-md">
                                    Request
                                </button>
                            </td>
                            <td className='px-4 py-2'>
                                <Link href={`/admin/warehouse/${params.warehouseDetail}/product/${item.id}/history`}>
                                    <div className="flex items-center justify-start text-gray-500 hover:text-[#018eb9] gap-2">
                                        <FaHistory /> History
                                    </div>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isCreateRequestModalOpen && (
                <CreateRequestModal closeManualRequestModal={() => closeModal(setIsCreateRequestModalOpen)} selectedProduct={selectedProduct} dataWarehouseDetail={dataWarehouseDetail} dataStockMutationTypeLists={dataStockMutationTypeLists} />
            )}
            {isAddStockModalOpen && (
                <AddStockModal closeAddStockModal={() => closeModal(setIsAddStockModalOpen)} selectedProduct={selectedProduct} dataWarehouseDetail={dataWarehouseDetail} warehouseId={params.warehouseDetail} />
            )}
            {isReduceStockModalOpen && (
                <ReduceStockModal closeReduceStockModal={() => closeModal(setIsReduceStockModalOpen)} selectedProduct={selectedProduct} dataWarehouseDetail={dataWarehouseDetail} warehouseId={params.warehouseDetail} />
            )}
        </div>
    )
}
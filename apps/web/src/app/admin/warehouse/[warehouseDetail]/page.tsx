'use client';
import { useState, useEffect } from 'react';
import { useGetWarehouseDetail } from "@/helpers/adminWarehouse/hooks/useGetWarehouseDetail";
import { useGetProductsStockPerWarehouse } from "@/helpers/adminWarehouse/hooks/useGetProductsStockPerWarehouse";
import { useGetStockMutationTypeLists } from '@/helpers/adminWarehouse/hooks/useGetStockMutationTypeLists';
import { createManualStockRequestSchema } from '@/helpers/adminWarehouse/schema/createManualStockRequestSchema';
import { useCreateManualStockRequest } from '@/helpers/adminWarehouse/hooks/useCreateManualStockRequest';
import { useGetStockRequestPerWarehouse } from '@/helpers/adminWarehouse/hooks/useGetStockRequestPerWarehouse';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { HiSortDescending, HiSortAscending } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import Link from "next/link";

export default function WarehouseDetail({ params }: { params: { warehouseDetail: string } }) {
    const { dataProductsStockPerWarehouse } = useGetProductsStockPerWarehouse(params.warehouseDetail);
    const { dataWarehouseDetail } = useGetWarehouseDetail(params.warehouseDetail);
    const { dataStockMutationTypeLists } = useGetStockMutationTypeLists(params.warehouseDetail);
    const { dataStockRequestPerWarehouse } = useGetStockRequestPerWarehouse(params.warehouseDetail);
    const { mutationCreateManualStockRequest } = useCreateManualStockRequest();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');
    const [sortedProducts, setSortedProducts] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [pendingRequests, setPendingRequests] = useState(0);

    useEffect(() => {
        if (dataProductsStockPerWarehouse?.products) {
            const defaultSortedProducts = [...dataProductsStockPerWarehouse.products].sort((a: any, b: any) => a.name.localeCompare(b.name));
            setSortedProducts(defaultSortedProducts);
        }
    }, [dataProductsStockPerWarehouse]);

    useEffect(() => {
        if (dataStockRequestPerWarehouse) {
            setPendingRequests(dataStockRequestPerWarehouse.length);
        }
    }, [dataStockRequestPerWarehouse]);

    const formatDate = (dateString: string) => new Date(dateString).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleSort = () => setSortOrder(sortOrder === 'default' ? 'asc' : sortOrder === 'asc' ? 'desc' : 'default');

    useEffect(() => {
        let updatedProducts = [...dataProductsStockPerWarehouse?.products || []];
        if (sortOrder === 'asc') updatedProducts.sort((a, b) => a.totalStock - b.totalStock);
        else if (sortOrder === 'desc') updatedProducts.sort((a, b) => b.totalStock - a.totalStock);

        if (searchTerm) updatedProducts = updatedProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setSortedProducts(updatedProducts);
    }, [searchTerm, sortOrder, dataProductsStockPerWarehouse]);

    const openModal = (product: any) => { setSelectedProduct(product); setIsModalOpen(true); }
    const closeModal = () => { setIsModalOpen(false); setSelectedProduct(null); }

    if ((dataProductsStockPerWarehouse === undefined) || (dataWarehouseDetail === undefined) || (dataStockMutationTypeLists === undefined) || (dataStockRequestPerWarehouse === undefined)) return <div>Loading...</div>;
    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <div className="flex flex-col">
                <div className="flex flex-col gap-2 mb-4">
                    <div className='flex justify-between'>
                        <div className="text-2xl font-semibold text-[#704b66]">
                            {dataWarehouseDetail?.name}
                        </div>
                        <Link href={`/admin/warehouse/${params.warehouseDetail}/stock-request`}>
                            <button className="relative px-4 py-2 bg-[#704b66] hover:bg-[#502b46] text-white rounded-md">
                                See Stock Requests
                                {pendingRequests > 0 && (
                                    <span className="absolute top-[-10px] right-[-10px] px-2 py-1 text-xs text-white bg-red-600 rounded-full">
                                        {pendingRequests}
                                    </span>
                                )}
                            </button>
                        </Link>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-black font-bold">
                            {dataWarehouseDetail?.province}, {dataWarehouseDetail?.city}
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="Search Product" value={searchTerm} onChange={handleSearch} className="px-4 py-2 border rounded-md" />
                            <button onClick={handleSort} className="px-4 py-2 w-[185px] bg-gray-100 hover:bg-gray-300 border rounded-md flex justify-center items-center gap-2">
                                Sort by Stock {sortOrder === 'asc' ? <HiSortAscending className='text-[#704b66]' /> : sortOrder === 'desc' ? <HiSortDescending className='text-[#704b66]' /> : '↔️'}
                            </button>
                        </div>
                    </div>
                </div>
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Product</th>
                            <th className="px-4 py-2 text-right">On Hand Stock</th>
                            <th className="px-4 py-2 text-left">UoM</th>
                            <th className="px-4 py-2 text-left">last Updated At</th>
                            <th className="px-4 py-2 text-left">Product Status</th>
                            <th className="px-4 py-2 text-left">Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts && sortedProducts.map((item: any, index: number) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2 text-right">{item.totalStock}.00</td>
                                <td className="px-4 py-2 text-left">Units</td>
                                <td className="px-4 py-2 text-left">{formatDate(item.updatedAt)}</td>
                                <td className={`px-4 py-2 text-left font-bold ${item.deletedAt ? 'text-red-500' : 'text-green-500'}`}>
                                    {item.deletedAt ? 'Currently Erased' : 'Active'}
                                </td>
                                <td className="px-4 py-2 flex items-center gap-2">
                                    <button onClick={() => openModal(item)} className="px-2 py-1 duration-300 bg-transparent hover:bg-[#704b66] hover:border-black hover:text-white text-[#704b66] border-2 border-[#704b66] rounded-md">
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
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="bg-white rounded-lg p-6 w-[1000px] mx-auto">
                            <div className="text-2xl font-semibold mb-4">Request Stock for {selectedProduct?.name}</div>
                            <Formik
                                initialValues={{
                                    warehouseSource: '',
                                    toid: dataWarehouseDetail?.id,
                                    productId: selectedProduct?.id,
                                    quantity: '',
                                }}
                                validationSchema={createManualStockRequestSchema}
                                onSubmit={async (values) => {
                                    const data = {
                                        quantity: Number(values.quantity),
                                        fromId: Number(values.warehouseSource),
                                        productId: Number(values.productId),
                                        toId: Number(dataWarehouseDetail?.id)
                                    }
                                    try {
                                        const createdManualStockRequest = await mutationCreateManualStockRequest(data);
                                        if (createdManualStockRequest) {
                                            closeModal();
                                        }
                                    } catch (error) {
                                        console.error('Error during form submission:', error);
                                    }
                                }}>
                                {({ dirty, isValid }) => (
                                    <Form className='flex flex-col gap-3'>
                                        <div className="mb-4">
                                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700"> Input Quantity to Request : </label>
                                            <Field id="quantity" name="quantity" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                            <ErrorMessage name="quantity" component="div" className="text-red-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="warehouseSource" className="block text-sm font-medium text-gray-700">Warehouse Source : </label>
                                            <Field as="select" id="warehouseSource" name="warehouseSource" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                                <option value="0">Select Warehouse Source</option>
                                                {dataStockMutationTypeLists && dataStockMutationTypeLists.map((item: any) => (
                                                    <option key={item.id} value={item.id}>{item.warehouse.name}, {item.warehouse.province}, {item.warehouse.city}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="warehouseSource" component="div" className="text-red-500" />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="warehouseDestination" className="block text-sm font-medium text-gray-700">Warehouse Destination : </label>
                                            <label htmlFor="">{dataWarehouseDetail?.name}, {dataWarehouseDetail?.province}, {dataWarehouseDetail?.city}</label>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md mr-2">Cancel</button>
                                            <button type="submit" disabled={!dirty || !isValid} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">Submit Request</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div >
                )}
            </div >
        </div >
    );
}

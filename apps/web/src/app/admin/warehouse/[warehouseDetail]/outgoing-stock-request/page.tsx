'use client'
import { useGetWarehouseDetail } from "@/helpers/adminWarehouse/hooks/useGetWarehouseDetail"
import { useGetOutgoingStockRequestPerWarehouse } from "@/helpers/adminWarehouse/hooks/useGetOutgoingStockRequestPerWarehouse"
import Link from "next/link"
import { IoIosArrowBack } from "react-icons/io"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OutgoingStockRequest({ params }: { params: { warehouseDetail: string } }) {
    const navigate = useRouter()
    const { dataOutgoingStockRequestPerWarehouse } = useGetOutgoingStockRequestPerWarehouse(params.warehouseDetail)
    const { dataWarehouseDetail,isError } = useGetWarehouseDetail(params.warehouseDetail)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        return `${date.toLocaleDateString(undefined, dateOptions)} ${date.toLocaleTimeString(undefined, timeOptions)}`;
    }
    useEffect(()=>{
        if(isError) navigate.back()
    },[isError])
    if (dataOutgoingStockRequestPerWarehouse === undefined) return <div>Loading...</div>
    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center gap-4 mb-4">
                    <div>
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li className="flex gap-2">
                                    <Link className="hover:text-eggplant" href={`/admin/warehouse/${params.warehouseDetail}`}>
                                        <IoIosArrowBack />{dataWarehouseDetail?.name}
                                    </Link>
                                </li>
                                <li>Stock Outgoing Request</li>
                            </ul>
                        </div>
                        <div className="text-[30px] font-bold">
                            Outgoing Requests
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-[#704b66] text-[15px] font-bold text-center">
                            {dataWarehouseDetail?.name}
                        </div>
                        <div className="text-gray-500 text-[12px] font-bold">
                            {dataWarehouseDetail?.province}, {dataWarehouseDetail?.city}
                        </div>
                    </div>
                </div>
            </div>
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Date Created</th>
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-left">From</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-left">UoM</th>
                        <th className="px-4 py-2 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {dataOutgoingStockRequestPerWarehouse.map((item: { id: number, Product: { name: string }, createdAt: string, from: { name: string, warehouse: { name: string } }, to: { name: string, warehouse: { name: string } }, quantity: number, status: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td className="px-4 py-2 text-left text-[14px]">{item.id}</td>
                            <td className="px-4 py-2 text-left text-[14px]">{formatDate(item.createdAt)}</td>
                            <td className="px-4 py-2 text-left text-[14px]">{item.Product.name}</td>
                            <td className="px-4 py-2 text-left text-[14px]">
                                {item.from.warehouse?.name ? `${item.from.warehouse.name}/` : ''}
                                {item.from.name}
                            </td>
                            <td className="px-4 py-2 text-right font-bold text-[14px]">{item.quantity}.00</td>
                            <td className="px-4 py-2 text-left text-[14px]">Units</td>
                            <td className="px-4 py-2 text-[14px] text-yellow-500 font-bold gap-2 flex justify-center">
                                {item.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
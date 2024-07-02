'use client'
import { useGetAllStockRequests } from "@/helpers/adminWarehouse/hooks/useGetAllStockRequests"
import { IoIosArrowBack } from "react-icons/io"
import Link from "next/link"
import Head from "next/head"

export default function AllStockRequest() {
    const { dataAllStockRequests } = useGetAllStockRequests()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        return `${date.toLocaleDateString(undefined, dateOptions)} ${date.toLocaleTimeString(undefined, timeOptions)}`;
    }
    if (dataAllStockRequests === undefined) return <div>Loading...</div>
    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <Head>
                <title>All Stock Requests</title>
                <meta name="description" content="View all stock requests across warehouses in the admin dashboard." />
            </Head>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center gap-4 mb-4">
                    <div>
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li className="flex gap-2">
                                    <Link className="hover:text-eggplant" href={`/admin/warehouse`}>
                                        <IoIosArrowBack /> All Warehouse
                                    </Link>
                                </li>
                                <li>All Stock Requests</li>
                            </ul>
                        </div>
                        <div className="text-[30px] font-bold">
                            All Stock Requests
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
                        <th className="px-4 py-2 text-left">To</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-left">UoM</th>
                        <th className="px-4 py-2 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAllStockRequests.map((item: { id: number, Product: { name: string }, createdAt: string, from: { name: string, warehouse: { name: string, id: number } }, to: { name: string, warehouse: { name: string } }, quantity: number, status: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td className="px-4 py-2 text-left text-[14px]">{item.id}</td>
                            <td className="px-4 py-2 text-left text-[14px]">{formatDate(item.createdAt)}</td>
                            <td className="px-4 py-2 text-left text-[14px]">{item.Product.name}</td>
                            <td className="px-4 py-2 text-left text-[14px]">
                                <Link href={`/admin/warehouse/${item.from.warehouse?.id}/stock-request`} className="text-blue-600 hover:underline">
                                    {item.from.warehouse?.name ? `${item.from.warehouse.name}/` : ''}
                                    {item.from.name}
                                </Link>
                            </td>
                            <td className="px-4 py-2 text-left text-[14px]">
                                {item.to.warehouse?.name ? `${item.to.warehouse.name}/` : ''}
                                {item.to.name}
                            </td>
                            <td className="px-4 py-2 text-right font-bold text-[14px]">{item.quantity}.00</td>
                            <td className="px-4 py-2 text-left text-[14px]">Units</td>
                            <td className="px-4 py-2 text-[14px] text-yellow-500 font-bold justify-center items-center">
                                {item.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

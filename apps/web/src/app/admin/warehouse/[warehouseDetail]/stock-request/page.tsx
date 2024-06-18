'use client'
import { useGetStockRequestPerWarehouse } from "@/helpers/adminWarehouse/hooks/useGetStockRequestPerWarehouse"
import { useGetWarehouseDetail } from "@/helpers/adminWarehouse/hooks/useGetWarehouseDetail"

export default function StockRequest({ params }: { params: { warehouseDetail: string } }) {
    const { dataStockRequestPerWarehouse } = useGetStockRequestPerWarehouse(params.warehouseDetail)
    const { dataWarehouseDetail } = useGetWarehouseDetail(params.warehouseDetail)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        return `${date.toLocaleDateString(undefined, dateOptions)} ${date.toLocaleTimeString(undefined, timeOptions)}`;
    }

    console.log(dataStockRequestPerWarehouse)

    if (dataStockRequestPerWarehouse === undefined) return <div>Loading...</div>
    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center gap-4 mb-4">
                    <div className="text-[30px] font-bold">
                        Incoming Requests
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
                        <th className="px-4 py-2 text-left">From</th>
                        <th className="px-4 py-2 text-left">To</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-left">UoM</th>
                        <th className="px-4 py-2 text-center">Status</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataStockRequestPerWarehouse.map((item: { id: number, createdAt: string, from: { name: string, warehouse: { name: string } }, to: { name: string, warehouse: { name: string } }, quantity: number, status: string }, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                            <td className="px-4 py-2 text-left text-[14px]">{item.id}</td>
                            <td className="px-4 py-2 text-left text-[14px]">{formatDate(item.createdAt)}</td>
                            <td className="px-4 py-2 text-left text-[14px]">
                                {item.from.warehouse?.name ? `${item.from.warehouse?.name}/` : ''}
                                {item.from.name}
                            </td>
                            <td className="px-4 py-2 text-left text-[14px]">
                                {item.to.warehouse?.name ? `${item.to.warehouse.name}/` : ''}
                                {item.to.name}
                            </td>
                            <td className="px-4 py-2 text-right text-[14px]">{item.quantity}.00</td>
                            <td className="px-4 py-2 text-left text-[14px]">Units</td>
                            <td className={`px-4 py-2 text-center text-[14px] w-[2px] ${item.status === 'PENDING' ? 'text-yellow-400 font-bold py-1 px-2' : ''}`}>
                                {item.status}
                            </td>
                            <td className="px-4 py-2 text-center text-[14px] gap-2 flex">
                                <button className="bg-green-600 text-white font-semibold py-1 px-3 rounded hover:bg-green-700 transition duration-300">
                                    Accept
                                </button>
                                <button className="bg-red-600 text-white font-semibold py-1 px-3 rounded hover:bg-red-700 transition duration-300">
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
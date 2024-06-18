'use client';
import { useGetWarehouseDetail } from "@/helpers/adminWarehouse/hooks/useGetWarehouseDetail"
import { useGetStockHistoryByProductAndWarehouse } from "@/helpers/adminWarehouse/hooks/useGetStockHistoryByProductAndWarehouse"

export default function ProductHistoryPerWarehouse({ params }: { params: { warehouseDetail: string, productId: string } }) {
    const { dataStockHistoryByProductAndWarehouse } = useGetStockHistoryByProductAndWarehouse(params.productId, params.warehouseDetail)
    const { dataWarehouseDetail } = useGetWarehouseDetail(params.warehouseDetail)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        return `${date.toLocaleDateString(undefined, dateOptions)} ${date.toLocaleTimeString(undefined, timeOptions)}`;
    }

    if ((dataStockHistoryByProductAndWarehouse === undefined) || (dataWarehouseDetail === undefined) || (dataStockHistoryByProductAndWarehouse.stockHistory === undefined)) return <div>Loading...</div>

    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center gap-4 mb-4">
                    <div className="text-[30px] font-bold">
                        {dataStockHistoryByProductAndWarehouse.product.name}
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
                <div className="text-[14px] font-semibold text-[#306261]">
                    Stock Mutation History
                </div>
            </div>
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Date Adjusted</th>
                        <th className="px-4 py-2 text-left">From</th>
                        <th className="px-4 py-2 text-left">To</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-left">UoM</th>
                        <th className="px-4 py-2 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {dataStockHistoryByProductAndWarehouse.stockHistory.map((item: { id: number, createdAt: string, from: { name: string, warehouse: { name: string } }, to: { name: string, warehouse: { name: string } }, quantity: number, status: string }, index: number) => (
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
                            <td className={`px-4 py-2 text-center text-[14px] w-[2px]
                                ${item.status === 'ACCEPTED' ? 'text-[#4CAF50] font-bold py-1 px-2' : ''} 
                                ${item.status === 'REJECTED' ? 'text-[#F44336] font-bold py-1 px-2' : ''} 
                                ${item.status === 'PENDING' ? 'text-yellow-400 font-bold py-1 px-2' : ''}`}>
                                {item.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

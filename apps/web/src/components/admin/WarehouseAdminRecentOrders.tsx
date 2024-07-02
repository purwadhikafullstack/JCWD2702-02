'use client'
import React from "react";
import { useGetRecentOrdersPerWarehouse } from "@/helpers/adminReport/hooks/useGetRecentOrdersPerWarehouse";
import { FaShoppingBag } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

export default function WarehouseAdminRecentOrders(warehouseDetail: { warehouseDetail: string }) {
    const { dataRecentOrdersPerWarehouse } = useGetRecentOrdersPerWarehouse(warehouseDetail.warehouseDetail);

    if (!dataRecentOrdersPerWarehouse) return <div>Loading...</div>

    return (
        <div className="w-full col-span-1 relative h-[95vh] m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="text-lg font-bold mb-4">Recent Orders</div>
            <ul>
                {dataRecentOrdersPerWarehouse.map((order: { id: number; totalOrderAmount: number; user: { fullname: string }; createdAt: Date }, index: number) => (
                    <li key={index} className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-4 flex items-center">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <FaShoppingBag className="text-purple-800" />
                        </div>
                        <div className="pl-4 flex-1">
                            <div className="text-gray-800 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                                {order.totalOrderAmount.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                            </div>
                            <div className="text-sm text-gray-400">{order.user.fullname}</div>
                        </div>
                        <div className="text-[12px] pt-[6px] text-gray-400 flex-shrink-0">
                            {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
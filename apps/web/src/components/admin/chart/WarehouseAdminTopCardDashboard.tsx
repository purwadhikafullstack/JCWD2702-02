'use client'
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useGetPeriodRevenuesPerWarehouse } from "@/helpers/adminReport/hooks/useGetPeriodRevenuesPerWarehouse";

export default function WarehouseAdminTopCardDashboard(warehouseDetail: { warehouseDetail: string }) {
    const { dataPeriodRevenuesPerWarehouse } = useGetPeriodRevenuesPerWarehouse(warehouseDetail.warehouseDetail);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[new Date().getMonth()];

    if (!dataPeriodRevenuesPerWarehouse) return <div>Loading...</div>

    return (
        <div className="grid grid-cols-5 gap-4 pt-2 pb-4">
            <div className="col-span-2 bg-white flex justify-between w-full border p-4 rounded-lg border-3 border-black">
                <div className="flex flex-col w-full pb-4">
                    <div className="text-2xl font-bold">YTD</div>
                    <div className="flex gap-2 items-center justify-start mt-[10px]">
                        <FaPlus className="text-gray-600" />
                        <div className="text-green-500 font-bold">
                            {dataPeriodRevenuesPerWarehouse.totalRevenueYear.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 bg-white flex justify-between w-full border p-4 rounded-lg border-3 border-black">
                <div className="flex flex-col w-full pb-4">
                    <div className="text-2xl font-bold">{currentMonth}&apos;s Revenue</div>
                    <div className="flex gap-2 items-center justify-start mt-[10px]">
                        <FaPlus className="text-gray-600" />
                        <div className="text-green-500 font-bold">
                            {dataPeriodRevenuesPerWarehouse.totalRevenueMonth.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white flex justify-between w-full border p-4 rounded-lg border-3 border-black">
                <div className="flex flex-col w-full pb-4">
                    <div className="text-2xl font-bold">Daily Revenue</div>
                    <div className="flex gap-2 items-center justify-start mt-[10px]">
                        <FaPlus className="text-gray-600" />
                        <div className="text-green-500 font-bold">
                            {dataPeriodRevenuesPerWarehouse.totalRevenueDay.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
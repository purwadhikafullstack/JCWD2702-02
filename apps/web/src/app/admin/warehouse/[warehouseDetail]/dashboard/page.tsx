'use client'
import React, { useState } from "react";
import { useGetWarehouseDetail } from "@/helpers/adminWarehouse/hooks/useGetWarehouseDetail";
import WarehouseAdminBarChartPerMonth from "@/components/admin/chart/WarehouseAdminBarChartPerMonth";
import WarehouseAdminLineChartPerMonth from "@/components/admin/chart/WarehouseAdminLineChartPerMonth";
import WarehouseAdminPieChartPerMonth from "@/components/admin/chart/WarehouseAdminPieChartPerMonth";
import WarehouseAdminRecentOrders from "@/components/admin/WarehouseAdminRecentOrders";
import WarehouseAdminTopCardDashboard from "@/components/admin/chart/WarehouseAdminTopCardDashboard";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Head from "next/head";

export default function WarehouseAdminDashboard({ params }: { params: { warehouseDetail: string } }) {
    const { dataWarehouseDetail } = useGetWarehouseDetail(params.warehouseDetail);
    const [chartTypePerMonth, setChartTypePerMonth] = useState("bar");

    const renderChart = () => {
        switch (chartTypePerMonth) {
            case "bar":
                return <WarehouseAdminBarChartPerMonth warehouseDetail={params.warehouseDetail} />;
            case "line":
                return <WarehouseAdminLineChartPerMonth warehouseDetail={params.warehouseDetail} />;
            case "pie":
                return <WarehouseAdminPieChartPerMonth warehouseDetail={params.warehouseDetail} />;
            default:
                return <WarehouseAdminBarChartPerMonth warehouseDetail={params.warehouseDetail} />;
        }
    };
    return (
        <div className="container mx-auto h-full max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 bg-white p-6 shadow-lg">
            <Head>
                <title>{dataWarehouseDetail?.name} Dashboard - Admin</title>
                <meta name="description" content={`Dashboard for ${dataWarehouseDetail?.name}. View charts and recent orders.`} />
            </Head>
            <div className="mb-2 flex">
                <div className="flex flex-row justify-between items-center gap-4">
                    <div>
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li className="flex gap-2">
                                    <Link className="hover:text-eggplant" href={`/admin/warehouse/${params.warehouseDetail}`}>
                                        <IoIosArrowBack /> {dataWarehouseDetail?.name}
                                    </Link>
                                </li>
                                <li>{dataWarehouseDetail?.name} Dashboard</li>
                            </ul>
                        </div>
                        <div className="text-3xl font-bold text-black">{dataWarehouseDetail?.name} Dashboard</div>
                    </div>
                </div>
            </div>
            <div className="w-full"><WarehouseAdminTopCardDashboard warehouseDetail={params.warehouseDetail} /></div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="col-span-1 md:col-span-2 flex flex-col">
                    <div className="flex gap-2 mb-4 justify-end">
                        <button className={`p-2 border ${chartTypePerMonth === "bar" ? "bg-gray-300" : "bg-white"}`} onClick={() => setChartTypePerMonth("bar")}>
                            <FaChartBar />
                        </button>
                        <button className={`p-2 border ${chartTypePerMonth === "line" ? "bg-gray-300" : "bg-white"}`} onClick={() => setChartTypePerMonth("line")}>
                            <FaChartLine />
                        </button>
                        <button className={`p-2 border ${chartTypePerMonth === "pie" ? "bg-gray-300" : "bg-white"}`} onClick={() => setChartTypePerMonth("pie")}>
                            <FaChartPie />
                        </button>
                    </div>
                    <div className="flex-grow">{renderChart()}</div>
                </div>
                <div className="col-span-1">
                    <WarehouseAdminRecentOrders warehouseDetail={params.warehouseDetail} />
                </div>
            </div>
        </div>
    );
}

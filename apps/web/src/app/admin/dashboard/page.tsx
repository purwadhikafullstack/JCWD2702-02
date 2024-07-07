'use client'
import React, { useState, useContext, useEffect } from "react";
import SuperAdminBarChartPerMonth from "@/components/admin/chart/SuperAdminBarChartPerMonth";
import SuperAdminLineChartPerMonth from "@/components/admin/chart/SuperAdminLineChartPerMonth";
import SuperAdminPieChartPerMonth from "@/components/admin/chart/SuperAdminPieChartPerMonth";
import SuperAdminRecentOrders from "@/components/admin/SuperAdminRecentOrders";
import SuperAdminTopCardDashboard from "@/components/admin/chart/SuperAdminTopCardDashboard";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { UserContext } from '@/config/context/userContext';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Head from "next/head";

export default function SuperAdminDashboard() {
  const navigate = useRouter()
  const { userData, setUserData }: any = useContext(UserContext)
  const [chartTypePerMonth, setChartTypePerMonth] = useState("bar");

  const renderChart = () => {
    switch (chartTypePerMonth) {
      case "bar":
        return <SuperAdminBarChartPerMonth />;
      case "line":
        return <SuperAdminLineChartPerMonth />;
      case "pie":
        return <SuperAdminPieChartPerMonth />;
      default:
        return <SuperAdminBarChartPerMonth />;
    }
  };

  useEffect(()=>{
    if(userData?.role != 1) navigate.push(`/admin/warehouse/${userData?.warehouse}`)
  },[userData])

  return (
    <div className="container mx-auto h-full max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 bg-white p-6 shadow-lg">
      <Head>
        <title>Super Admin Dashboard</title>
        <meta name="description" content="Dashboard for Super Admin to manage various charts and orders." />
      </Head>
      <div className="mb-2 flex">
        <div className="flex flex-row justify-between items-center gap-4">
          <div>
            <div className="text-sm breadcrumbs">
              <ul>
                <li className="flex gap-2">
                  <Link className="hover:text-eggplant" href={`/admin/warehouse`}>
                    <IoIosArrowBack /> All Warehouse
                  </Link>
                </li>
                <li>All Warehouse Dashboard</li>
              </ul>
            </div>
            <div className="text-3xl font-bold text-black">Super Admin Dashboard</div>
          </div>
        </div>
      </div>
      <div className="w-full"><SuperAdminTopCardDashboard /></div>
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
          <SuperAdminRecentOrders />
        </div>
      </div>
    </div>
  );
}

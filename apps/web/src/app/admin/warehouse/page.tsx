'use client'

import { useGetAllWarehouse } from "@/helpers/adminWarehouse/hooks/useGetAllWarehouse";
import AdminWarehouseCard from "@/components/admin/AdminWarehouseCard";

export default function Warehouse() {
    const { dataWarehouses } = useGetAllWarehouse();

    if (!dataWarehouses) return <div>Loading...</div>
    return (
        <div className="container mx-auto p-6 h-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center mb-6">
                <div className="text-3xl font-bold text-black">Warehouses</div>
            </div>
            <div>
                {dataWarehouses && dataWarehouses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {dataWarehouses.map((item: { id: number; name: string; province: string, city: string }, index: number) => (
                            <AdminWarehouseCard key={index} id={item.id} name={item.name} province={item.province} city={item.city} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">No warehouse defined</div>
                )}
            </div>
        </div>
    )
}

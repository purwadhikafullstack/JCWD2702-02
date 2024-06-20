'use client'

import { useGetAllWarehouse } from '@/helpers/adminWarehouse/hooks/useGetAllWarehouse'
import AdminWarehouseCard from '@/components/admin/AdminWarehouseCard'

export default function Warehouse() {
  const { dataWarehouses } = useGetAllWarehouse()

  if (!dataWarehouses) return <div>Loading...</div>
  return (
    <div className='container mx-auto h-full max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 bg-white p-6 shadow-lg'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='text-3xl font-bold text-black'>Warehouses</div>
      </div>
      <div>
        {dataWarehouses && dataWarehouses.length > 0 ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {dataWarehouses.map(
              (
                item: {
                  id: number
                  name: string
                  province: string
                  city: string
                },
                index: number
              ) => (
                <AdminWarehouseCard
                  key={index}
                  id={item.id}
                  name={item.name}
                  province={item.province}
                  city={item.city}
                />
              )
            )}
          </div>
        ) : (
          <div className='text-center text-gray-500'>No warehouse defined</div>
        )}
      </div>
    </div>
  )
}

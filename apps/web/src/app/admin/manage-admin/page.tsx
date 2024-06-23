'use client'

import AdminCard from '@/components/admin/AdminCard'
import { useRouter } from 'next/navigation'
import { getWarehouseAdmin } from '@/helpers/admin/hooks/getWarehouseAdmin'
import Loading from '@/components/cores/Loading'

export default function ManageAdmin() {
  const navigate = useRouter()
  const { dataWarehouseAdmin, warehouseAdminLoading } = getWarehouseAdmin()

  const warehouseAdminData = dataWarehouseAdmin?.data?.data

  //   console.log(warehouseAdminData)

  //   if (warehouseAdminLoading) return <Loading></Loading>
  return (
    <div className='container mx-auto max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Manage Admin</div>
      </div>
      <div className='flex h-[400px] w-full snap-y snap-mandatory flex-col gap-5 overflow-y-scroll p-10'>
        <div className='w-full overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Uid</th>
                <th>Name</th>
                <th>Email</th>
                <th>Warehouse</th>
              </tr>
            </thead>
            <tbody>
              {warehouseAdminData?.map((x: any, i: any) => {
                return (
                  <tr
                    onClick={() =>
                      navigate.push(`/admin/manage-admin/${x?.uid}`)
                    }
                    className='hover'
                    key={i}
                  >
                    <th>{i + 1}</th>
                    <td>{x?.uid}</td>
                    <td>{x?.fullname}</td>
                    <td>{x?.email}</td>
                    <td>{x?.Warehouse?.name}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard /> */}
      </div>
    </div>
  )
}

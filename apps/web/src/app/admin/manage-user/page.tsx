'use client'

import { useRouter } from 'next/navigation'
import { getAllUser } from '@/helpers/admin/hooks/getAllUser'

export default function ManageUser() {
  const navigate = useRouter()
  const { dataAllUser } = getAllUser()

  const allUserData = dataAllUser?.data?.data

  console.log(allUserData)

  return (
    <div className='container mx-auto max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Manage User</div>
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
              </tr>
            </thead>
            <tbody>
              {allUserData?.map((x: any, i: any) => {
                return (
                  <tr
                    onClick={() =>
                      navigate.push(`/admin/manage-user/${x?.uid}`)
                    }
                    className='hover'
                    key={i}
                  >
                    <th>{i + 1}</th>
                    <td>{x?.uid}</td>
                    <td>{x?.fullname}</td>
                    <td>{x?.email}</td>
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

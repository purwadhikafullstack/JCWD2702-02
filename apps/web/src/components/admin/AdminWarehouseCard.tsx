import Link from 'next/link';
import { IAdminWarehouseCard } from './types';
import { FaArrowRightLong } from "react-icons/fa6";

export default function AdminWarehouseCard({ id, name, province, city }: IAdminWarehouseCard) {
    return (
        <div className="w-[280px] h-[180px] flex flex-col border-2 border-[#704b66] rounded-lg p-4 bg-gray-50 transition duration-200">
            <div className='flex flex-col'>
                <div className="text-[15px] text-[#01626b] font-bold mb-2">{name}</div>
                <div className="text-[12px] text-gray-600 font-bold">{province}</div>
                <div className='text-[12px] text-gray-600 font-medium'>{city}</div>
            </div>
            <div className='mt-auto flex justify-end'>
                <Link href={`/admin/warehouse/${id}`}>
                    <button className='flex items-center gap-2 p-2 bg-[#704b66] hover:bg-[#624159] text-white rounded'>
                        <div className='text-[14px]'>Manage Warehouse</div>
                        <div><FaArrowRightLong /></div>
                    </button>
                </Link>
            </div>
        </div>
    );
};

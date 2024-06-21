import Link from 'next/link';
import Image from 'next/image';
import {
    MdProductionQuantityLimits, MdCategory, MdDashboardCustomize, MdApps, MdOutlineWarehouse
} from 'react-icons/md';
import { CiDeliveryTruck } from "react-icons/ci";

export default function AdminSidebarDesktop() {
    return (
        <div className="min-h-screen p-2 space-y-2 w-60 bg-eggplant text-white">
            <Link href={'/'}>
                <div className="flex items-center justify-center">
                    <Image src='/DECORIFY-LOGO.png' alt="decorify logo" width={100} height={100} />
                </div>
            </Link>

            <div className="flex items-center justify-center p-2 space-x-4">
                <div>
                    <div className="text-lg font-semibold">Super Admin</div>
                </div>
            </div>
            <div className="divide-y divide-gray-300">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li>
                        <Link
                            rel="noopener noreferrer"
                            href={'/admin/dashboard'}
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <MdDashboardCustomize className="w-5 h-5 fill-current" />
                            <div className="font-sans font-semibold tracking-wide hover:text-red-600">
                                DASHBOARD
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div className="collapse collapse-arrow">
                            <input type="checkbox" />
                            <div className="collapse-title flex items-center p-2 space-x-3 rounded-md">
                                <MdApps className="w-5 h-5 fill-current" />
                                <div className="font-sans font-semibold tracking-wide">
                                    MANAGE
                                </div>
                            </div>
                            <div className="collapse-content">
                                <Link
                                    rel="noopener noreferrer"
                                    href={'/admin/product'}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <MdProductionQuantityLimits className="w-5 h-5 fill-current" />
                                    <div className="font-sans font-semibold tracking-wide hover:text-red-600">
                                        PRODUCT
                                    </div>
                                </Link>
                                <Link
                                    rel="noopener noreferrer"
                                    href={'/admin/category'}
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <MdCategory className="w-5 h-5 fill-current" />
                                    <div className="font-sans font-semibold tracking-wide hover:text-red-600">
                                        CATEGORY
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link
                            rel="noopener noreferrer"
                            href={'/admin/warehouse'}
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <MdOutlineWarehouse className="w-5 h-5 fill-current" />
                            <div className="font-sans font-semibold tracking-wide hover:text-red-600">
                                WAREHOUSE
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            rel="noopener noreferrer"
                            href={'/admin/all-stock-request'}
                            className="flex items-center p-2 mt-[15px] space-x-3 rounded-md"
                        >
                            <CiDeliveryTruck className="w-5 h-5 fill-current" />
                            <div className="font-sans font-semibold tracking-wide hover:text-red-600">
                                ALL STOCK REQUESTS
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

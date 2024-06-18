import { IAdminProductCard } from "./types";
import Image from "next/image";
import Link from "next/link";

export default function AdminProductCard({ id, name, price, productImage }: IAdminProductCard) {
    return (
        <Link href={`/admin/product/${id}`} passHref>
            <div className="border border-gray-300 rounded-lg shadow-lg p-4 m-2 flex flex-col items-center">
                <Image src={productImage} alt={name} className="rounded-md mb-4 object-cover" width={150} height={150} />
                <div className="text-lg font-semibold mb-2">{name}</div>
                <div className="text-gray-700">{price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
            </div>
        </Link>
    );
}

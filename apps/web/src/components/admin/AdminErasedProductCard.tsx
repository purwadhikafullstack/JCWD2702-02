import { IAdminProductCard } from "./types";
import Image from "next/image";
import { FaUndo } from "react-icons/fa";
import { useRestoreErasedProduct } from "@/helpers/adminProduct/hooks/useRestoreErasedProduct";

export const AdminErasedProductCard = ({ id, name, price, productImage }: IAdminProductCard) => {
    const { mutationRestoreErasedProduct } = useRestoreErasedProduct(String(id));
    const handleRestore = () => {
        mutationRestoreErasedProduct(String(id));
    };

    return (
        <div className="relative border border-gray-300 rounded-lg shadow-lg p-4 m-2 flex flex-col items-center">
            <button onClick={handleRestore} className="absolute top-2 left-2 text-green-600 hover:text-green-800">
                <FaUndo size={20} />
            </button>
            <Image src={productImage} alt={name} className="rounded-md mb-4 object-cover" width={150} height={150} />
            <div className="text-lg font-semibold mb-2">{name}</div>
            <div className="text-gray-700">{price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
        </div>
    );
}
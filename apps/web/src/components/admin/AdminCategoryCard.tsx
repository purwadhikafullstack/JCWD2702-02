import Image from "next/image";
import UpdateCategoryForm from "./UpdateCategoryForm";
import { IAdminCategoryCard } from "./types";
import { useSoftDeleteCategory } from "@/helpers/adminCategory/hooks/useSoftDeleteCategory";

export default function AdminCategoryCard({ category, onUpdate, isUpdating, onFormClose }: IAdminCategoryCard) {
    const { mutationSoftDeleteCategory } = useSoftDeleteCategory();

    const handleDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            mutationSoftDeleteCategory(category.id);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 border-b border-gray-200 last:border-none">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    <Image src={`http://localhost:8000/${category.categoryUrl}`} alt={category.name} width={80} height={80} className="rounded-md" />
                </div>
                <div>
                    <div className="text-lg font-semibold">{category.name}</div>
                </div>
                <div className="ml-auto flex gap-2">
                    <button
                        onClick={onUpdate}
                        className="text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                        Update
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="text-red-600 border border-red-300 px-4 py-2 rounded-md hover:bg-red-100 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
            <div className={`transition-all duration-500 ${isUpdating ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <UpdateCategoryForm category={category} onClose={onFormClose} />
            </div>
        </div>
    );
}

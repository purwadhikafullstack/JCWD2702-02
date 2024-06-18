'use client';
import { useState } from "react";
import { useGetAllProductCategories } from "@/helpers/shop/hooks/useGetAllProductCategories";
import AdminCategoryCard from "@/components/admin/AdminCategoryCard";
import CreateCategoryForm from "@/components/admin/CreateCategoryForm";

export default function AdminCategory() {
    const { dataProductCategories } = useGetAllProductCategories();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [categoryToUpdate, setCategoryToUpdate] = useState<any | null>(null);

    const handleCreateButtonClick = () => {
        setShowCreateForm(true);
        setCategoryToUpdate(null);
    };

    const handleFormClose = () => {
        setShowCreateForm(false);
        setCategoryToUpdate(null);
    };

    if (!dataProductCategories) return <div>Loading...</div>

    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-semibold">Categories</div>
                <button onClick={handleCreateButtonClick}
                    className="text-white bg-eggplant px-4 py-2 rounded-md hover:bg-hover_eggplant transition-colors">
                    Create New Category
                </button>
            </div>
            <div className={`transition-all duration-1000 ${showCreateForm ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <CreateCategoryForm onClose={handleFormClose} />
            </div>
            <div className="flex flex-col gap-5">
                {dataProductCategories?.map((item: any) => (
                    <AdminCategoryCard key={item.id} category={item} onUpdate={() => setCategoryToUpdate(item)} isUpdating={categoryToUpdate && categoryToUpdate.id === item.id} onFormClose={handleFormClose} />
                ))}
            </div>
        </div>
    );
}

'use client';
import { useState } from 'react';
import { IUpdateCategoryFormProps } from './types';
import { useUpdateCategory } from '@/helpers/adminCategory/hooks/useUpdateCategory';
import { toast } from 'react-toastify';

export default function UpdateCategoryForm({ category, onClose }: IUpdateCategoryFormProps) {
    const [name, setName] = useState(category.name);
    const [categoryImage, setCategoryImage] = useState<string[] | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { mutationUpdateCategory } = useUpdateCategory();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setShowConfirmation(true);
    };

    const onSetCategoryImage = (event: any) => {
        try {
            const acceptedFormat = ['jpg', 'jpeg', 'webp', 'png', 'svg']
            const files = [...event.target.files]

            files.forEach(file => {
                if (!acceptedFormat.includes(file.name.split('.')[file.name.split('.').length - 1])) {
                    toast.error(`${file.name} Format Not Acceptable`)
                }
                if (file.size > (1 * 1024 * 1024)) {
                    toast.error(`${file.name} is too Large! Maximum Filesize is 1Mb`)
                }
            })

            if (files.length > 1) throw { message: `You cannot select more than 1 image` }

            setCategoryImage(files)
        } catch (error) {
            console.log(error)
        }
    }

    const handleConfirmUpdate = async () => {
        const fd = new FormData();
        fd.append('data', JSON.stringify({
            name: name
        }));
        if (categoryImage) {
            fd.append('categoryurl', categoryImage![0]);
        }
        await mutationUpdateCategory({ data: fd as any, id: category.id });
        onClose();
        setShowConfirmation(false);
    };

    const handleCancelUpdate = () => {
        setShowConfirmation(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-300 rounded-md shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700">Category Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Category Image</label>
                <input
                    type="file"
                    onChange={(e) => onSetCategoryImage(e)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <p className="text-lg font-semibold mb-4">Confirm Update</p>
                        <p className="mb-4">Are you sure you want to update this category?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={handleCancelUpdate} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
                            <button onClick={handleConfirmUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}

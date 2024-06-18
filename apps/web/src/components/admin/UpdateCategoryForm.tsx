'use client';
import { useState } from 'react';
import { IUpdateCategoryFormProps } from './types';
import { useUpdateCategory } from '@/helpers/adminCategory/hooks/useUpdateCategory';

export default function UpdateCategoryForm({ category, onClose }: IUpdateCategoryFormProps) {
    const [name, setName] = useState(category.name);
    const [categoryImage, setCategoryImage] = useState<string[] | null>(null);
    const { mutationUpdateCategory } = useUpdateCategory();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('data', JSON.stringify({
            name: name
        }));
        if (categoryImage) {
            fd.append('categoryurl', categoryImage![0]);
        }
        await mutationUpdateCategory({ data: fd as any, id: category.id });
        onClose();
    };

    const onSetCategoryImage = (event: any) => {
        try {
            const acceptedFormat = ['jpg', 'jpeg', 'webp', 'png', 'svg']
            const files = [...event.target.files]

            files.forEach(file => {
                if (!acceptedFormat.includes(file.name.split('.')[file.name.split('.').length - 1])) {
                    throw { message: `${file.name} Format Not Acceptable` }
                }
                if (file.size > (1 * 1024 * 1024)) {
                    throw { message: `${file.name} is too Large! Maximum Filesize is 1Mb` }
                }
            })

            if (files.length > 1) throw { message: `You cannot select more than 1 image` }

            setCategoryImage(files)
        } catch (error) {
            console.log(error)
        }
    }

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
        </form>
    );
}
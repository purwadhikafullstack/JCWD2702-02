'use client';
import { useState } from 'react';
import { ICreateCategoryFormProps } from './types';
import { useCreateCategory } from '@/helpers/adminCategory/hooks/useCreateCategory';

export default function CreateCategoryForm({ onClose }: ICreateCategoryFormProps) {
    const [name, setName] = useState('');
    const [categoryImage, setCategoryImage] = useState<string[] | null>(null);
    const { mutationCreateCategory } = useCreateCategory();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('data', JSON.stringify({
            name: name
        }));
        fd.append('categoryurl', categoryImage![0]);
        await mutationCreateCategory(fd as any);
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
        <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-md">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Category Name
                </label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="mb-4">
                <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700">
                    Category Image
                </label>
                <input type="file" id="categoryImage" onChange={(e) => onSetCategoryImage(e)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" accept="image/*" required
                />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" >
                    Create
                </button>
            </div>
        </form>
    );
}

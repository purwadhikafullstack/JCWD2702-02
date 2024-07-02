'use client'
import { useState } from 'react'
import { useGetAllProductCategories } from '@/helpers/shop/hooks/useGetAllProductCategories'
import AdminCategoryCard from '@/components/admin/AdminCategoryCard'
import CreateCategoryForm from '@/components/admin/CreateCategoryForm'
import Head from 'next/head'

export default function AdminCategory() {
  const { dataProductCategories } = useGetAllProductCategories()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [categoryToUpdate, setCategoryToUpdate] = useState<any | null>(null)

  const handleCreateButtonClick = () => {
    setShowCreateForm(true)
    setCategoryToUpdate(null)
  }

  const handleFormClose = () => {
    setShowCreateForm(false)
    setCategoryToUpdate(null)
  }

  if (!dataProductCategories) return <div>Loading...</div>

  return (
    <div className='container mx-auto max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 p-4 shadow-lg'>
      <Head>
        <title>Admin Categories</title>
        <meta name="description" content="Manage product categories for the admin dashboard." />
      </Head>
      <div className='mb-4 flex items-center justify-between'>
        <div className='text-2xl font-semibold'>Categories</div>
        <button
          onClick={handleCreateButtonClick}
          className='rounded-md bg-eggplant px-4 py-2 text-white transition-colors hover:bg-hover_eggplant'>
          Create New Category
        </button>
      </div>
      <div
        className={`transition-all duration-1000 ${showCreateForm ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
      >
        <CreateCategoryForm onClose={handleFormClose} />
      </div>
      <div className='flex flex-col gap-5'>
        {dataProductCategories?.map((item: any) => (
          <AdminCategoryCard
            key={item.id}
            category={item}
            onUpdate={() => setCategoryToUpdate(item)}
            isUpdating={categoryToUpdate && categoryToUpdate.id === item.id}
            onFormClose={handleFormClose}
          />
        ))}
      </div>
    </div>
  )
}

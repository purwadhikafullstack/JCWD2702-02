'use client'
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { useGetAllProductCategories } from '@/helpers/shop/hooks/useGetAllProductCategories';
import { createProductSchema } from '@/helpers/adminProduct/schema/createProductSchema';
import { useCreateProduct } from '@/helpers/adminProduct/hooks/useCreateProduct';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from "react-icons/io"
import Link from "next/link"

export default function CreateProduct() {
    const router = useRouter();
    const { dataProductCategories } = useGetAllProductCategories();
    const [productImages, setProductImages] = useState<string[]>([]);
    const { mutationCreateProduct } = useCreateProduct();

    const onSetProductImage = (event: any) => {
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

            if (files.length > 4) toast.error(`Cannot Create Product, Max 4 images allowed`)

            setProductImages(files)
        } catch (error) {
            console.log(error)
        }
    }

    if (!dataProductCategories) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4 border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh] bg-white">
            <Head>
                <title>Create Product</title>
                <meta name="description" content="Create a new product with name, description, price, category, weight, and images." />
            </Head>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li className="flex gap-2">
                        <Link className="hover:text-eggplant" href={`/admin/warehouse`}>
                            <IoIosArrowBack /> All Warehouse
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-eggplant" href={`/admin/product`}>
                            All Products
                        </Link>
                    </li>
                    <li>Create Product</li>
                </ul>
            </div>
            <div className="text-2xl font-bold mb-4 text-[#704b66]">Create Product</div>
            <div>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        price: 0,
                        categoryId: '',
                        weight: ''
                    }}
                    validationSchema={createProductSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const fd = new FormData();
                            fd.append('data', JSON.stringify({
                                name: values.name,
                                description: values.description,
                                price: values.price,
                                categoryId: parseInt(values.categoryId),
                                weight: Number(values.weight) * 1000
                            }));
                            for (let i = 0; i < productImages.length; i++) {
                                fd.append('producturl', productImages[i]);
                            }
                            const createdProductResult = await mutationCreateProduct(fd);

                            if (createdProductResult) {
                                resetForm();
                                setProductImages([]);
                                router.push('/admin/product');
                            }
                        } catch (error) {
                            console.error('Error during form submission:', error);
                        }
                    }}>
                    {({ dirty, isValid }) => (
                        <Form className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="mb-1 text-black">Name</label>
                                <Field id="name" className="p-2 border-b border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66]" type="text" name="name" placeholder="Enter Here" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="description" className="mb-1 text-black">Description</label>
                                <Field id="description" className="p-2 border-b border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66]" type="text" name="description" placeholder="Enter Here" />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="price" className="mb-1 text-black">Price (IDR)</label>
                                <Field id="price" className="p-2 border-b border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66]" type="number" name="price" placeholder="Enter Here" />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="weight" className="mb-1 text-black">Weight (KG)</label>
                                <Field id="weight" className="p-2 border-b border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66]" type="text" name="weight" placeholder="Enter Here" />
                                <ErrorMessage name="weight" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="categoryId" className="mb-1 text-black">Category</label>
                                <Field as="select" id="categoryId" name="categoryId" className="p-2 border-b border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66]">
                                    <option value="0">Select Category</option>
                                    {dataProductCategories.map((item: any) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoryId" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="image" className="mb-1 text-black">Image (Up to 4 images)</label>
                                <input required type="file" multiple onChange={(event) => onSetProductImage(event)} name="productImages" accept='image/*' className="p-2 border-b border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66]" />
                            </div>
                            <div>
                                <button type="submit" disabled={!dirty || !isValid} className="text-white bg-[#704b66] px-4 py-2 rounded-md hover:bg-purple-800 transition-colors">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

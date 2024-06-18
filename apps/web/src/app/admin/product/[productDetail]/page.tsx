'use client'
import { useGetProductDetail } from "@/helpers/productDetail/hooks/useGetProductDetail";
import { useGetAllProductCategories } from "@/helpers/shop/hooks/useGetAllProductCategories";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createProductSchema } from "@/helpers/adminProduct/schema/createProductSchema";
import { AiFillProduct, AiOutlineUpload } from "react-icons/ai";
import { useUpdateProduct } from "@/helpers/adminProduct/hooks/useUpdateProduct";
import { useUpdateProductImage } from "@/helpers/adminProductImages/hooks/useUpdateProductImage";
import { useSoftDeleteProduct } from "@/helpers/adminProduct/hooks/useSoftDeleteProduct";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }: { params: { productDetail: string } }) {
    const router = useRouter();
    const { productDetail } = useGetProductDetail(params.productDetail);
    const { dataProductCategories } = useGetAllProductCategories();
    const { mutationUpdateProduct } = useUpdateProduct(params.productDetail);
    const { mutationUpdateProductImage } = useUpdateProductImage(params.productDetail);
    const { mutationSoftDeleteProduct } = useSoftDeleteProduct(params.productDetail);

    const onsetProductImage = (event: any, imageId: number) => {
        try {
            const formData = new FormData();
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

            formData.append('producturl', files[0])
            console.log(files[0])
            const updatedProductImage = mutationUpdateProductImage({
                data: formData,
                id: String(imageId)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onHandleErase = () => {
        if (confirm("Are you sure you want to erase this product? You still can restore this product later.")) {
            try {
                mutationSoftDeleteProduct(params.productDetail);
                router.push('/admin/product');
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (!productDetail || productDetail?.products.id != params.productDetail || !dataProductCategories) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4 border border-transparent hover:border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-[95vh] flex flex-col gap-5 transition-all">
            <div>
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        {productDetail?.productImages.map((productImage: { id: number, productUrl: string }, index: number) => (
                            <div key={index} className="relative group flex flex-col items-center">
                                <Image className="rounded-xl" src={`http://localhost:8000/${productImage.productUrl}`} alt={productImage.productUrl} width={100} height={100} />
                                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <input type="file" onChange={(event) => onsetProductImage(event, productImage.id)} accept="image/*" className="hidden" />
                                    <AiOutlineUpload size={24} className="text-white" />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <Formik
                    initialValues={{
                        name: productDetail?.products.name,
                        description: productDetail?.products.description,
                        price: productDetail?.products.price,
                        categoryId: productDetail?.products.categoryId
                    }}
                    validationSchema={createProductSchema}
                    onSubmit={async (values) => {
                        const data = {
                            name: values.name,
                            description: values.description,
                            price: parseInt(values.price),
                            categoryId: parseInt(values.categoryId)
                        }
                        try {
                            const updatedProduct = await mutationUpdateProduct({
                                data,
                                id: productDetail?.products.id
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    {({ dirty, isValid }) => (
                        <Form className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <AiFillProduct size={50} />
                                        <Field className="p-2 text-[40px] border-b border-transparent hover:border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66] transition-all" type="text" name="name" placeholder="Enter Here" />
                                    </div>
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <button disabled={!dirty || !isValid} type="submit" className="text-black justify-center h-[40px] hover:bg-[#704b66] hover:text-white flex items-center px-4 py-2 border-2 border-[#704b66] hover:border-black rounded-md transition-all">
                                    Update
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="description" className="mb-1 text-black">Description</label>
                                <Field className="p-2 text-[20px] border-b border-transparent hover:border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66] transition-all" type="text" name="description" placeholder="Enter Here" />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="price" className="mb-1 text-black">Price</label>
                                <div className="flex items-center ml-[10px]">
                                    <div className="text-[20px]">IDR </div>
                                    <Field className="p-2 text-[20px] w-[130px] border-b border-transparent hover:border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66] transition-all" type="text" name="price" placeholder="Enter Here" />
                                </div>
                                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="categoryId" className="mb-1 text-black">Category</label>
                                <Field as="select" name="categoryId" className="p-2 border-b border-transparent hover:border-gray-300 rounded-t-md focus:outline-none focus:border-b-2 focus:border-[#704b66] transition-all">
                                    <option value="0">Select Category</option>
                                    {dataProductCategories.map((item: any) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoryId" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="flex justify-end">
                    <button onClick={onHandleErase} className=" mt-4 text-red-600 border border-red-300 px-4 py-2 rounded-md hover:bg-red-100 transition-colors">
                        Erase Product
                    </button>
                </div>
            </div>
        </div>
    );
}

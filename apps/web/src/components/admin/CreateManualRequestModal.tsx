'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createManualStockRequestSchema } from '@/helpers/adminWarehouse/schema/createManualStockRequestSchema';
import { useCreateManualStockRequest } from '@/helpers/adminWarehouse/hooks/useCreateManualStockRequest';
import { ICreateRequestModalProps } from "./types";

export default function CreateRequestModal({ closeManualRequestModal, selectedProduct, dataWarehouseDetail, dataStockMutationTypeLists }: ICreateRequestModalProps) {
    const { mutationCreateManualStockRequest } = useCreateManualStockRequest();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-[1000px] mx-auto">
                <div className="text-2xl font-semibold mb-4">Request Stock for {selectedProduct?.name}</div>
                <Formik
                    initialValues={{
                        warehouseSource: '',
                        toid: dataWarehouseDetail?.id,
                        productId: selectedProduct?.id,
                        quantity: '',
                    }}
                    validationSchema={createManualStockRequestSchema}
                    onSubmit={async (values) => {
                        const data = {
                            quantity: Number(values.quantity),
                            fromId: Number(values.warehouseSource),
                            productId: Number(values.productId),
                            toId: Number(dataWarehouseDetail?.id),
                        };
                        try {
                            const createdManualStockRequest = await mutationCreateManualStockRequest(data);
                            if (createdManualStockRequest) {
                                closeManualRequestModal();
                            }
                        } catch (error) {
                            console.error('Error during form submission:', error);
                        }
                    }}>
                    {({ dirty, isValid }) => (
                        <Form className="flex flex-col gap-3">
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    Input Quantity to Request :
                                </label>
                                <Field
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <ErrorMessage name="quantity" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="warehouseSource" className="block text-sm font-medium text-gray-700">
                                    Warehouse Source :
                                </label>
                                <Field
                                    as="select"
                                    id="warehouseSource"
                                    name="warehouseSource"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                    <option value="0">Select Warehouse Source</option>
                                    {dataStockMutationTypeLists &&
                                        dataStockMutationTypeLists.map((item: any) => (
                                            <option key={item.id} value={item.id}>
                                                {item.warehouse.name}, {item.warehouse.province}, {item.warehouse.city}
                                            </option>
                                        ))}
                                </Field>
                                <ErrorMessage name="warehouseSource" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="warehouseDestination" className="block text-sm font-medium text-gray-700">
                                    Warehouse Destination :
                                </label>
                                <label htmlFor="">
                                    {dataWarehouseDetail?.name}, {dataWarehouseDetail?.province}, {dataWarehouseDetail?.city}
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={closeManualRequestModal} className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md mr-2">
                                    Cancel
                                </button>
                                <button type="submit" disabled={!dirty || !isValid} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                                    Submit Request
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
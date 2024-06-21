'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAddStock } from '@/helpers/adminWarehouse/hooks/useAddStock';
import { addStockSchema } from '@/helpers/adminWarehouse/schema/addStockSchema';
import { IAddStockModalProps } from './types';

export default function AddStockModal({ closeAddStockModal, selectedProduct, dataWarehouseDetail, warehouseId }: IAddStockModalProps) {
    const { mutationAddStock } = useAddStock(warehouseId);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-[500px] mx-auto">
                <div className="text-2xl font-semibold mb-4">Add Stock for {selectedProduct?.name}</div>
                <Formik
                    initialValues={{
                        quantity: '',
                        toId: dataWarehouseDetail?.id
                    }}
                    validationSchema={addStockSchema}
                    onSubmit={async (values) => {
                        const data = {
                            quantity: Number(values.quantity),
                            productId: Number(selectedProduct?.id),
                            toId: Number(dataWarehouseDetail?.id),
                        };
                        try {
                            const addedStock = await mutationAddStock(data);
                            if (addedStock) {
                                closeAddStockModal();
                            }
                        } catch (error) {
                            console.error('Error during form submission:', error);
                        }
                    }}

                >
                    {({ dirty, isValid }) => (
                        <Form className="flex flex-col gap-3">
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    Input Quantity to Add :
                                </label>
                                <Field id="quantity" name="quantity" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                <ErrorMessage name="quantity" component="div" className="text-red-500" />
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
                                <button type="button" onClick={closeAddStockModal} className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md mr-2">
                                    Cancel
                                </button>
                                <button type="submit" disabled={!dirty || !isValid} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                                    Add Stock
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
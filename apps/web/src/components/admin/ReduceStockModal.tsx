'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useReduceStock } from '@/helpers/adminWarehouse/hooks/useReduceStock';
import { reduceStockSchema } from '@/helpers/adminWarehouse/schema/reduceStockSchema';
import { IReduceStockModalProps } from './types';

export default function ReduceStockModal({ closeReduceStockModal, selectedProduct, dataWarehouseDetail, warehouseId }: IReduceStockModalProps) {
    const { mutationReduceStock } = useReduceStock(warehouseId)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-[500px] mx-auto">
                <div className="text-2xl font-semibold mb-4">Reduce Stock for {selectedProduct?.name}</div>
                <Formik
                    initialValues={{
                        quantity: '',
                        fromId: dataWarehouseDetail?.id
                    }}
                    validationSchema={reduceStockSchema}
                    onSubmit={async (values) => {
                        const data = {
                            quantity: Number(values.quantity),
                            productId: Number(selectedProduct?.id),
                            fromId: Number(dataWarehouseDetail?.id),
                        };
                        try {
                            const reducedStock = await mutationReduceStock(data);
                            if (reducedStock) {
                                closeReduceStockModal();
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
                                    Input Quantity to Reduce :
                                </label>
                                <Field id="quantity" name="quantity" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                <ErrorMessage name="quantity" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="warehouseSource" className="block text-sm font-medium text-gray-700">
                                    Warehouse Source :
                                </label>
                                <label htmlFor="">
                                    {dataWarehouseDetail?.name}, {dataWarehouseDetail?.province}, {dataWarehouseDetail?.city}
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={closeReduceStockModal} className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md mr-2">
                                    Cancel
                                </button>
                                <button type="submit" disabled={!dirty || !isValid} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
                                    Reduce Stock
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
'use client'
import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { useGetOrdersPerMonthPerWarehouse } from "@/helpers/adminReport/hooks/useGetOrdersPerMonthPerWarehouse";
import { useGetExistingProducts } from "@/helpers/adminReport/hooks/useGetExistingProducts";
import { useGetExistingCategories } from "@/helpers/adminReport/hooks/useGetExistingCategories";
import { ProductOption, CategoryOption } from "./ChartTypes";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend)

export default function WarehouseAdminPieChartPerMonth({ warehouseDetail }: { warehouseDetail: string }) {
    const [chartData, setChartData]: any = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});
    const [selectedProduct, setSelectedProduct] = useState<SingleValue<ProductOption>>(null);
    const [selectedCategory, setSelectedCategory] = useState<SingleValue<CategoryOption>>(null);

    const { dataOrdersPerMonthPerWarehouse, refetchDataOrdersPerMonthPerWarehouse } = useGetOrdersPerMonthPerWarehouse(warehouseDetail, selectedCategory?.value, selectedProduct?.value);
    const { dataExistingProducts } = useGetExistingProducts();
    const { dataExistingCategories } = useGetExistingCategories();

    useEffect(() => {
        setChartData({
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: "Sales Per Month",
                    data: dataOrdersPerMonthPerWarehouse?.sales,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                        "rgba(99, 255, 132, 0.6)",
                        "rgba(235, 162, 54, 0.6)",
                        "rgba(206, 255, 86, 0.6)",
                        "rgba(192, 75, 192, 0.6)",
                        "rgba(102, 153, 255, 0.6)",
                        "rgba(159, 255, 64, 0.6)"
                    ],
                    borderColor: "rgba(255, 255, 255, 1)",
                    borderWidth: 1,
                }
            ],
        })

        setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top" as const,
                },
                title: {
                    display: true,
                    text: "Monthly Sales Report",
                },
            },
        })
    }, [dataOrdersPerMonthPerWarehouse])

    const handleProductChange = (selectedOption: SingleValue<ProductOption>) => {
        setSelectedProduct(selectedOption);
        if (selectedOption) {
            setSelectedCategory(null)
        }
    };

    const handleCategoryChange = (selectedOption: SingleValue<CategoryOption>) => {
        setSelectedCategory(selectedOption);
        setSelectedProduct(null)
    };

    const handleFilterSubmit = () => {
        if (selectedProduct) {
            refetchDataOrdersPerMonthPerWarehouse();
        } else if (selectedCategory) {
            refetchDataOrdersPerMonthPerWarehouse();
        } else {
            refetchDataOrdersPerMonthPerWarehouse();
        }
    };

    const productOptions = dataExistingProducts?.map((product: { id: string; name: string; }) => ({
        value: product.id,
        label: product.name
    }));

    const categoryOptions = dataExistingCategories?.map((category: { id: string; name: string; }) => ({
        value: category.id,
        label: category.name
    }));

    if (!dataOrdersPerMonthPerWarehouse) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex items-center mb-4">
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                    isClearable
                    placeholder="Type or select a category"
                    className="mr-4 w-64"
                />
                <Select
                    value={selectedProduct}
                    onChange={handleProductChange}
                    options={productOptions}
                    isClearable
                    placeholder="Type or select a product"
                    className="mr-4 w-64"
                />
                <button onClick={handleFilterSubmit} className="p-2 bg-eggplant text-white text-[14px] rounded-md hover:bg-hover_eggplant">
                    Filter
                </button>
            </div>
            <div className="w-full md:col-span-2 relative h-[81vh] m-auto p-4 border rounded-lg bg-white">
                <Pie data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}
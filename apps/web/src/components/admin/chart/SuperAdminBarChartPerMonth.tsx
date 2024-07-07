'use client'
import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { useGetOrdersPerMonth } from "@/helpers/adminReport/hooks/useGetOrdersPerMonth";
import { useGetExistingProducts } from "@/helpers/adminReport/hooks/useGetExistingProducts";
import { useGetExistingCategories } from "@/helpers/adminReport/hooks/useGetExistingCategories";
import { ProductOption, CategoryOption } from "./ChartTypes";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SuperAdminBarChartPerMonth() {
    const [chartData, setChartData]: any = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});
    const [selectedProduct, setSelectedProduct] = useState<SingleValue<ProductOption>>(null);
    const [selectedCategory, setSelectedCategory] = useState<SingleValue<CategoryOption>>(null);

    const { dataOrdersPerMonth, refetchDataOrdersPerMonth } = useGetOrdersPerMonth(selectedCategory?.value, selectedProduct?.value);
    const { dataExistingProducts } = useGetExistingProducts();
    const { dataExistingCategories } = useGetExistingCategories();

    useEffect(() => {
        setChartData({
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: "Sales Per Month",
                    data: dataOrdersPerMonth?.sales,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                }
            ],
        });

        setChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Rupiah (IDR)',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Months',
                    }
                }
            },
            plugins: {
                legend: {
                    position: "top" as const,
                },
                title: {
                    display: true,
                    text: "Monthly Sales Report",
                },
            },
        });
    }, [dataOrdersPerMonth]);

    const handleProductChange = (selectedOption: SingleValue<ProductOption>) => {
        setSelectedProduct(selectedOption);
        if (selectedOption) {
            setSelectedCategory(null);
        }
    };

    const handleCategoryChange = (selectedOption: SingleValue<CategoryOption>) => {
        setSelectedCategory(selectedOption);
        setSelectedProduct(null);
    };

    const handleFilterSubmit = () => {
        if (selectedProduct) {
            refetchDataOrdersPerMonth();
        } else if (selectedCategory) {
            refetchDataOrdersPerMonth();
        } else {
            refetchDataOrdersPerMonth();
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

    if (!dataOrdersPerMonth) return <div>Loading...</div>;

    return (
        <div className="">
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
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

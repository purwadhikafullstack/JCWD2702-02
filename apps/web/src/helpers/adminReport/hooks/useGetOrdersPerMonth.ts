import { useGetOrdersPerMonthQuery } from "../api/useGetOrdersPerMonthQuery";

export const useGetOrdersPerMonth = (productId?: string, categoryId?: string) => {
    const { ordersPerMonth, refetchDataOrdersPerMonth, isLoading } = useGetOrdersPerMonthQuery(productId, categoryId);

    return {
        dataOrdersPerMonth: ordersPerMonth?.data?.data,
        refetchDataOrdersPerMonth,
        isLoading
    };
}
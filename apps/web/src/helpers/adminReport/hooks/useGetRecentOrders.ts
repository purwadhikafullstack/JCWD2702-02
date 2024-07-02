import { useGetRecentOrdersQuery } from "../api/useGetRecentOrdersQuery";

export const useGetRecentOrders = () => {
    const { recentOrders, refetchDataRecentOrders, isLoading } = useGetRecentOrdersQuery();

    return {
        dataRecentOrders: recentOrders?.data?.data,
        refetchDataRecentOrders,
        isLoading
    };
}
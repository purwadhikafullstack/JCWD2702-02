import { useGetPeriodRevenuesQuery } from "../api/useGetPeriodRevenuesQuery";

export const useGetPeriodRevenues = () => {
    const { periodRevenues, refetchDataPeriodRevenues } = useGetPeriodRevenuesQuery();
    return { dataPeriodRevenues: periodRevenues?.data?.data, refetchDataPeriodRevenues };
}
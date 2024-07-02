import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPeriodRevenuesQuery = () => {
    const { data: periodRevenues, refetch: refetchDataPeriodRevenues } = useQuery({
        queryKey: ["periodRevenues"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/report/period-revenues`);
            return res;
        },
    });
    return { periodRevenues, refetchDataPeriodRevenues };
}
import { useGetExistingCategoriesQuery } from "../api/useGetExistingCategoriesQuery";

export const useGetExistingCategories = () => {
    const { existingCategories, refetchDataExistingCategories, isLoading } = useGetExistingCategoriesQuery();
    return {
        dataExistingCategories: existingCategories?.data?.data,
        refetchDataExistingCategories,
        isLoading
    };
}
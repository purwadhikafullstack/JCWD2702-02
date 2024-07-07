import { useGetProvinceQuery } from '../api/getProvinceQuery'

export const useGetProvince = () => {
  const {
    data: dataProvince,
    isLoading: provinceLoading,
    refetch,
  } = useGetProvinceQuery()

  return { dataProvince, provinceLoading, refetch }
}

import { useEffect, useState } from 'react'
import { useGetCityDetailedQuery } from '../api/getCityDetailedQuery'

export const useGetCityDetailed = (provinceId: any, cityId: any) => {
  const {
    data: dataDetailedCity,
    isLoading: detailedCityLoading,
    refetch,
  } = useGetCityDetailedQuery(provinceId, cityId)

  return { dataDetailedCity, detailedCityLoading, refetch }
}

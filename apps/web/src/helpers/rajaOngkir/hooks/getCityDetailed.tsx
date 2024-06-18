import { useEffect, useState } from 'react'
import { getCityDetailedQuery } from '../api/getCityDetailedQuery'

export const getCityDetailed = (provinceId: any, cityId: any) => {
  const {
    data: dataDetailedCity,
    isLoading: detailedCityLoading,
    refetch,
  } = getCityDetailedQuery(provinceId, cityId)

  return { dataDetailedCity, detailedCityLoading, refetch }
}

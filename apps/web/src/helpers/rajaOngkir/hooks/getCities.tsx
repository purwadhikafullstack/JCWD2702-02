import { useEffect, useState } from 'react'
import { useGetCitiesQuery } from '../api/getCitiesQuery'

export const useGetCities = (provinceId: any) => {
  const {
    data: dataCities,
    isLoading: citiesLoading,
    refetch,
  } = useGetCitiesQuery(provinceId)

  return { dataCities, citiesLoading, refetch }
}

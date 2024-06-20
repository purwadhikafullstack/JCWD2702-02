import { useEffect, useState } from 'react'
import { getCitiesQuery } from '../api/getCitiesQuery'

export const getCities = (provinceId: any) => {
  const {
    data: dataCities,
    isLoading: citiesLoading,
    refetch,
  } = getCitiesQuery(provinceId)

  return { dataCities, citiesLoading, refetch }
}

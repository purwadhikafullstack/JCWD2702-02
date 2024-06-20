import { useEffect, useState } from 'react'
import { getProvinceQuery } from '../api/getProvinceQuery'

export const getProvince = () => {
  const {
    data: dataProvince,
    isLoading: provinceLoading,
    refetch,
  } = getProvinceQuery()

  return { dataProvince, provinceLoading, refetch }
}

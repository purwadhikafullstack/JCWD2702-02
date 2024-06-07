import { useEffect, useState } from 'react'
import { useGetUserQuery } from '../api/useGetUserQuery'

export const useGetUser = () => {
  const { data: dataUser, isLoading } = useGetUserQuery()

  return { dataUser, isLoading }
}

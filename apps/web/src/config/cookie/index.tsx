'use server'
import { cookies } from 'next/headers'

export const setCookie = async (accesstoken: string) => {
  await cookies().set('acctkn', accesstoken)
}

export const getCookie = () => {
  return cookies().get('acctkn')
}

export const deleteCookie = () => {
  return cookies().delete('acctkn')
}

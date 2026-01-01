import { User } from '@/types/app/user.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getUsers = async (params?: Record<string, string | boolean>) => {
  const res = await serverApiFetch<User[]>('/user', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getUserById = async (id: string) => {
  const res = await serverApiFetch<User>(`/user/${id}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

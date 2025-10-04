import { User } from '@/types/app/user.type'
import { serverApiFetch } from '../serverApiFetch'
import { Response } from '@/types/response'

export const getUsers = async (params?: Record<string, string>): Promise<Response<User>> => {
  const res = await serverApiFetch('/user', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getUserById = async (id: string): Promise<{ status: number; data: User }> => {
  const res = await serverApiFetch(`/user/${id}`, {
    method: 'GET'
  })

  return {
    ...res
  }
}

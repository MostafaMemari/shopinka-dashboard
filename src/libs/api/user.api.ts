import { User } from '@/types/app/user.type'
import { serverApiFetch } from '../serverApiFetch'
import { Response } from '@/types/response'

export const getUsers = async (params?: Record<string, string>): Promise<Response<User>> => {
  const res = await serverApiFetch('/user', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

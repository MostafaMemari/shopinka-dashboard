'use server'

import { User } from '@/types/app/user.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'
import { cookies } from 'next/headers'
import { COOKIE_NAMES } from '../constants'
import { ApiResult } from '@/types/api'

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

export const getMe = async (): Promise<ApiResult<User>> => {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value

  if (!accessToken) return { ok: false, status: 401, message: 'No access token' }

  const res = await serverApiFetch<User>('/user/me', { method: 'GET' })

  const api = unwrapApi<User>(res)

  if (api.error) {
    return { ok: false, status: api.status, message: api.error }
  }

  return { ok: true, status: api.status, data: api.data as User }
}

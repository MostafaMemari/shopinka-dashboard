'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAMES } from '@/libs/constants'
import { ApiResult } from '@/types/api'

export type ServerApiFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: BodyInit | Record<string, unknown>
  query?: Record<string, string | number | boolean>
  headers?: HeadersInit
}

export async function serverApiFetch<T>(path: string, options: ServerApiFetchOptions = {}): Promise<ApiResult<T>> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  const body = options.method !== 'GET' && options.body ? (options.body instanceof FormData ? options.body : JSON.stringify(options.body)) : undefined

  let queryString = ''

  if (options.query && Object.keys(options.query).length > 0) {
    const params = new URLSearchParams(Object.entries(options.query).map(([k, v]) => [k, String(v)]))

    queryString = `?${params.toString()}`
  }

  const url = `${process.env.API_BASE_URL}${path}${queryString}`

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers
    },
    body,
    cache: 'no-store'
  })

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: 'خطا در ارتباط با سرور'
    }
  }

  const contentType = response.headers.get('content-type')
  const data = contentType?.includes('application/json') ? await response.json() : await response.text()

  return {
    ok: true,
    status: response.status,
    data: data as T
  }
}

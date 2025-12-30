'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAMES } from '@/libs/constants'

export const serverApiFetch = async (
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: any
    query?: Record<string, any>
    headers?: HeadersInit
  } = {}
) => {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || ''

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  let queryString = ''

  if (options.query && Object.keys(options.query).length > 0) {
    const params = new URLSearchParams(options.query as Record<string, string>)

    queryString = `?${params.toString()}`
  }

  const url = `${process.env.API_BASE_URL}${path}${queryString}`

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers
      },
      body: options.method && options.method !== 'GET' ? (isFormData ? options.body : JSON.stringify(options.body)) : undefined,
      cache: 'no-store'
    })

    const contentType = response.headers.get('content-type')
    const data = contentType?.includes('application/json') ? await response.json() : await response.text()

    return {
      status: response.status,
      data
    }
  } catch (error: any) {
    return {
      status: 500,
      data: { message: 'خطای ناشناخته', error: error.message }
    }
  }
}

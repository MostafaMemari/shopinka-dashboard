import { ApiResult } from '@/types/api'

export function unwrapApi<T>(res: ApiResult<T>) {
  if (!res.ok) {
    return {
      status: res.status,
      data: null as T | null,
      error: res.message
    }
  }

  return {
    status: res.status,
    data: res.data,
    error: null
  }
}

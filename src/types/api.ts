export type ApiSuccess<T> = {
  ok: true
  status: number
  data: T
}

export type ApiError = {
  ok: false
  status: number
  message: string
}

export type ApiResult<T> = ApiSuccess<T> | ApiError

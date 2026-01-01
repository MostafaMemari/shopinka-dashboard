'use server'

import 'server-only'
import { cookies } from 'next/headers'
import { COOKIE_NAMES } from '../constants'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '../helpers/unwrapApi'

interface VerifyOtpResponse {
  accessToken: string
  refreshToken: string
}

export const sendOtp = async (mobile: string) => {
  const res = await serverApiFetch('/auth/authenticate', {
    method: 'POST',
    body: { mobile }
  })

  return unwrapApi(res)
}

export const verifyOtp = async (mobile: string, otp: string) => {
  const res = await serverApiFetch<VerifyOtpResponse>('/auth/verify-authenticate-otp', {
    method: 'POST',
    body: { mobile, otp }
  })

  const result = unwrapApi(res)

  if (result.status === 200 || result.status === 201) {
    const { accessToken, refreshToken } = result.data as VerifyOtpResponse

    const cookieStore = await cookies()

    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000)
    })
    cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000)
    })
  }

  return result
}

export const logout = async () => {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value

  if (!refreshToken) {
    return { status: 400, data: null, error: 'Refresh token not found' }
  }

  const res = await serverApiFetch('/auth/signout', {
    method: 'POST',
    body: { refreshToken }
  })

  cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN)
  cookieStore.delete(COOKIE_NAMES.REFRESH_TOKEN)

  return unwrapApi(res)
}

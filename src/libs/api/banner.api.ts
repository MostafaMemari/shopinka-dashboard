import { Banner, BannerFormType } from '@/types/app/banner.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getBanners = async (params?: Record<string, string | boolean>) => {
  const res = await serverApiFetch<Banner[]>('/banner', {
    method: 'GET',
    query: { includeValues: true, ...params }
  })

  return unwrapApi(res)
}

export const getBanner = async (id: number) => {
  const res = await serverApiFetch<Banner>(`/banner/${id}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

export const removeBanner = async (id: string) => {
  const res = await serverApiFetch<{ message: string; banner: Banner }>(`/banner/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}

export const updateBanner = async (id: number, data: Partial<BannerFormType>) => {
  const res = await serverApiFetch<Banner>(`/banner/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createBanner = async (data: BannerFormType) => {
  const res = await serverApiFetch<Banner>('/banner', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}

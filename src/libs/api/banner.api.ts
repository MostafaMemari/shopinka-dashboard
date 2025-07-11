import { Banner, BannerFormType } from '@/types/app/banner.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getBanners = async (params?: Record<string, string>): Promise<Response<Banner[]>> => {
  const res = await serverApiFetch('/banner?includeValues=true', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getBanner = async (id: number): Promise<{ status: number; data: Banner | null }> => {
  const res = await serverApiFetch(`/banner/${id}}`, { method: 'GET' })

  return {
    ...res
  }
}

export const removeBanner = async (id: string): Promise<{ status: number; data: { message: string; banner: Banner } | null }> => {
  const res = await serverApiFetch(`/banner/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateBanner = async (id: string, data: Partial<BannerFormType>): Promise<{ status: number; data: Banner | null }> => {
  const res = await serverApiFetch(`/banner/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createBanner = async (data: BannerFormType): Promise<{ status: number; data: Banner | null }> => {
  const res = await serverApiFetch('/banner', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

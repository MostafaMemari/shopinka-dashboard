import { Font, FontFormType } from '@/types/app/font.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getFonts = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<Font[]>('/font', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getFont = async (id: number) => {
  const res = await serverApiFetch<FontFormType>(`/font/${id}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

export const removeFont = async (id: string) => {
  const res = await serverApiFetch<{ message: string; font: FontFormType }>(`/font/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}

export const updateFont = async (id: string, data: Partial<FontFormType>) => {
  const res = await serverApiFetch<FontFormType>(`/font/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createFont = async (data: Omit<FontFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
  const res = await serverApiFetch<FontFormType>('/font', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}

export const toggleFontDefaultStatus = async (id: string, isDefault: boolean) => {
  const res = await serverApiFetch<Font>(`/font/${id}`, {
    method: 'PATCH',
    body: { isDefault }
  })

  return unwrapApi(res)
}

export const setDefaultFont = async (id: number) => {
  const res = await serverApiFetch<Font[]>(`/font/${id}/default`, {
    method: 'PATCH'
  })

  return unwrapApi(res)
}

export const reorderFonts = async (orderData: { id: number; displayOrder: number }[]) => {
  const res = await serverApiFetch<Font[]>('/font/reorder', {
    method: 'PATCH',
    body: { orderData }
  })

  return unwrapApi(res)
}

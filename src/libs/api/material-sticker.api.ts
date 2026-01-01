import { MaterialSticker, MaterialStickerFormType } from '@/types/app/material-sticker.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getMaterialStickers = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<MaterialSticker[]>('/material-sticker', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getMaterialSticker = async (id: number) => {
  const res = await serverApiFetch<MaterialSticker>(`/material-sticker/${id}`, { method: 'GET' })

  return unwrapApi(res)
}

export const removeMaterialSticker = async (id: string) => {
  const res = await serverApiFetch<{ message: string; materialSticker: MaterialSticker }>(`/material-sticker/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}

export const updateMaterialSticker = async (id: string, data: Partial<MaterialStickerFormType>) => {
  const res = await serverApiFetch<MaterialSticker>(`/material-sticker/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createMaterialSticker = async (data: Omit<MaterialStickerFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
  const res = await serverApiFetch<MaterialSticker>('/material-sticker', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}

export const toggleMaterialStickerDefaultStatus = async (id: string, isDefault: boolean) => {
  const res = await serverApiFetch<MaterialSticker>(`/material-sticker/${id}`, {
    method: 'PATCH',
    body: { isDefault }
  })

  return unwrapApi(res)
}

export const setDefaultMaterialSticker = async (id: number) => {
  const res = await serverApiFetch<MaterialSticker[]>(`/material-sticker/${id}/default`, {
    method: 'PATCH'
  })

  return unwrapApi(res)
}

export const reorderMaterialStickers = async (orderData: { id: number; displayOrder: number }[]) => {
  const res = await serverApiFetch<MaterialSticker[]>('/material-sticker/reorder', {
    method: 'PATCH',
    body: { orderData }
  })

  return unwrapApi(res)
}

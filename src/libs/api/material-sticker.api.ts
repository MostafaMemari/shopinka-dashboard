import { MaterialSticker, MaterialStickerFormType } from '@/types/app/material-sticker.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getMaterialStickers = async (params?: Record<string, string>): Promise<Response<MaterialSticker[]>> => {
  const res = await serverApiFetch('/material-sticker', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getMaterialSticker = async (id: number): Promise<{ status: number; data: MaterialSticker | null }> => {
  const res = await serverApiFetch(`/material-sticker/${id}`, { method: 'GET' })

  return {
    ...res
  }
}

export const removeMaterialSticker = async (id: string): Promise<{ status: number; data: { message: string; materialSticker: MaterialSticker } | null }> => {
  const res = await serverApiFetch(`/material-sticker/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateMaterialSticker = async (id: string, data: Partial<MaterialStickerFormType>): Promise<{ status: number; data: MaterialSticker | null }> => {
  const res = await serverApiFetch(`/material-sticker/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createMaterialSticker = async (
  data: Omit<MaterialStickerFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<{ status: number; data: MaterialSticker | null }> => {
  const res = await serverApiFetch('/material-sticker', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const toggleMaterialStickerDefaultStatus = async (id: string, isDefault: boolean): Promise<{ status: number; data: MaterialSticker | null }> => {
  try {
    const res = await serverApiFetch(`/material-sticker/${id}`, { method: 'PATCH', body: { isDefault } })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: error.message
    }
  }
}

export const setDefaultMaterialSticker = async (id: number): Promise<{ status: number; data: MaterialSticker[] | null }> => {
  const res = await serverApiFetch(`/material-sticker/${id}/default`, { method: 'PATCH' })

  return {
    ...res
  }
}

export const reorderMaterialStickers = async (orderData: { id: number; displayOrder: number }[]): Promise<{ status: number; data: MaterialSticker[] | null }> => {
  const res = await serverApiFetch('/material-sticker/reorder', {
    method: 'PATCH',
    body: [...orderData]
  })

  return {
    ...res
  }
}

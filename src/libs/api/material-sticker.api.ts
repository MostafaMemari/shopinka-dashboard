import { MaterialSticker, MaterialStickerFormType } from '@/types/app/material-sticker.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'
import { MaterialStickerForm } from '@/views/pages/material-sticker/DesktopMaterialStickerTable'

export const getMaterialStickers = async (params?: Record<string, string>): Promise<Response<MaterialSticker[]>> => {
  const res = await serverApiFetch('/material-stickers', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getMaterialSticker = async (id: number): Promise<{ status: number; data: MaterialStickerFormType | null }> => {
  const res = await serverApiFetch(`/material-stickers/${id}}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const removeMaterialSticker = async (id: string): Promise<{ status: number; data: { message: string; materialSticker: MaterialStickerForm } | null }> => {
  const res = await serverApiFetch(`/material-stickers/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateMaterialSticker = async (id: string, data: Partial<MaterialStickerFormType>): Promise<{ status: number; data: MaterialStickerForm | null }> => {
  const res = await serverApiFetch(`/material-stickers/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createMaterialSticker = async (
  data: Omit<MaterialStickerFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<{ status: number; data: MaterialStickerForm | null }> => {
  const res = await serverApiFetch('/material-stickers', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

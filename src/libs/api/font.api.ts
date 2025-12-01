import { Font, FontFormType } from '@/types/app/font.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'
import { FontForm } from '@/views/pages/fonts/DesktopFontTable'

export const getFonts = async (params?: Record<string, string>): Promise<Response<Font[]>> => {
  const res = await serverApiFetch('/font', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getFont = async (id: number): Promise<{ status: number; data: FontFormType | null }> => {
  const res = await serverApiFetch(`/font/${id}}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const removeFont = async (id: string): Promise<{ status: number; data: { message: string; font: FontForm } | null }> => {
  const res = await serverApiFetch(`/font/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateFont = async (id: string, data: Partial<FontFormType>): Promise<{ status: number; data: FontForm | null }> => {
  const res = await serverApiFetch(`/font/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createFont = async (data: Omit<FontFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ status: number; data: FontForm | null }> => {
  const res = await serverApiFetch('/font', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

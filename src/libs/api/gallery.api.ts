import { Gallery, GalleryFormType } from '@/types/app/gallery.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getGalleries = async (params?: Record<string, string>): Promise<Response<Gallery[]>> => {
  const res = await serverApiFetch('/gallery', { method: 'GET', query: { ...params } })

  return {
    ...res
  }
}

export const getGallery = async (id: number): Promise<{ status: number; data: Gallery | null }> => {
  const res = await serverApiFetch(`/gallery/${id}`, { method: 'GET' })

  return {
    ...res
  }
}

export const removeGallery = async (id: string): Promise<{ status: number; data: { message: string; attribute: Gallery } | null }> => {
  const res = await serverApiFetch(`/gallery/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

export const updateGallery = async (id: string, data: Partial<GalleryFormType>): Promise<{ status: number; data: Gallery | null }> => {
  console.log(data)

  const res = await serverApiFetch(`/gallery/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  return {
    ...res
  }
}

export const createGallery = async (data: Omit<GalleryFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<{ status: number; data: Gallery | null }> => {
  const res = await serverApiFetch('/gallery', {
    method: 'POST',
    body: { ...data }
  })

  return {
    ...res
  }
}

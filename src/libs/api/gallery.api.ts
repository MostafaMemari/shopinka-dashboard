import { Gallery, GalleryFormType } from '@/types/app/gallery.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getGalleries = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<Gallery[]>('/gallery', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getGallery = async (id: number) => {
  const res = await serverApiFetch<Gallery>(`/gallery/${id}`, { method: 'GET' })

  return unwrapApi(res)
}

export const removeGallery = async (id: string) => {
  const res = await serverApiFetch<{ message: string; attribute: Gallery }>(`/gallery/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}

export const updateGallery = async (id: string, data: Partial<GalleryFormType>) => {
  const res = await serverApiFetch<Gallery>(`/gallery/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createGallery = async (data: Omit<GalleryFormType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
  const res = await serverApiFetch<Gallery>('/gallery', {
    method: 'POST',
    body: data
  })

  return unwrapApi(res)
}

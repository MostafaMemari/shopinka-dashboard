import { GalleryItem, GalleryItemFormType } from '@/types/app/galleryItem.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getItemGalleries = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<GalleryItem[]>('/gallery-item', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getGalleryItemById = async (id: number) => {
  const res = await serverApiFetch<GalleryItem>(`/gallery-item/${id}`, { method: 'GET' })

  return unwrapApi(res)
}

export const getGalleryItems = async (params: Record<string, string>) => {
  const res = await serverApiFetch<GalleryItem[]>('/gallery-item', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const removeGalleryItem = async (galleryItemIds: string[], isForce: boolean = true) => {
  const res = await serverApiFetch<{ message: string; attribute: GalleryItem }>('/gallery-item', {
    method: 'DELETE',
    body: { galleryItemIds, isForce }
  })

  return unwrapApi(res)
}

export const updateGalleryItem = async (id: number, data: Partial<GalleryItemFormType>) => {
  const res = await serverApiFetch<GalleryItem>(`/gallery-item/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createGalleryItem = async (formData: FormData) => {
  const res = await serverApiFetch<GalleryItem>('/gallery-item', {
    method: 'POST',
    body: formData
  })

  return unwrapApi(res)
}

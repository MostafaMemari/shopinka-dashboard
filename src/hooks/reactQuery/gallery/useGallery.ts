'use client'

import { createGallery, getGalleries, updateGallery } from '@/libs/api/gallery.api'
import { getGalleryItems } from '@/libs/api/galleyItem.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { Gallery, GalleryFormType } from '@/types/app/gallery.type'
import { errorGalleryMessage } from '@/messages/galleryMessages'
import { useFormMutation } from '../../useFormMutation'

export function useGalleryItems({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchGalleryItems = () => getGalleryItems(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.GalleryItems, params],
    queryFn: fetchGalleryItems,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

export function useGallery({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchGallery = () => getGalleries(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Galleries, params],
    queryFn: fetchGallery,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseGalleryFormProps {
  initialData?: Gallery
  onSuccess?: () => void
}

export const useGalleryForm = ({ initialData, onSuccess }: UseGalleryFormProps) => {
  const isUpdate = !!initialData

  return useFormMutation<GalleryFormType>({
    createApi: createGallery,
    updateApi: updateGallery,
    errorMessages: errorGalleryMessage,
    queryKey: QueryKeys.Galleries,
    successMessage: isUpdate ? 'گالری با موفقیت ویرایش شد' : 'گالری با موفقیت ثبت شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    errorMessage: isUpdate ? 'خطایی در ویرایش گالری رخ داد' : 'خطای سیستمی رخ داد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

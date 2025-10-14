'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { Page, PageFormType } from '@/types/app/page.type'
import { createPage, updatePage } from '@/libs/api/page.api'
import { useFormMutation } from '@/hooks/useFormMutation'
import { errorPageMessage } from '@/messages/pageMessages'
import { createGalleryItem, updateGalleryItem } from '@/libs/api/galleyItem.api'
import { GalleryItem, GalleryItemFormType } from '@/types/app/galleryItem.type'

interface Props {
  initialData?: GalleryItem
  onSuccess?: () => void
}

export const useGalleryItemFormSubmit = ({ initialData, onSuccess }: Props) => {
  const isUpdate = !!initialData

  return useFormMutation<GalleryItemFormType & { id?: string }>({
    createApi: async (formData: GalleryItemFormType) => {
      // const response = await createGalleryItem(formData)
      // return { status: response.status, data: { id: response.data?.galleryItem?.id } }

      return { status: 200, data: { id: '1' } }
    },

    updateApi: async (pageId: string, formData: Partial<GalleryItemFormType>) => {
      const cleanedData: Partial<GalleryItemFormType> = {
        ...formData,
        title: !!formData.title ? formData.title : '',
        description: !!formData.description ? formData.description : ''
      }

      return updateGalleryItem(Number(pageId), cleanedData)
    },
    errorMessages: errorPageMessage,
    successMessage: isUpdate ? 'تصویر با موفقیت به‌روزرسانی شد' : 'تصویر با موفقیت ایجاد شد',
    initialData: initialData ? ({ ...initialData, id: String(initialData.id) } as any) : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

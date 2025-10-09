'use client'

import { useFormMutation } from '@/hooks/useFormMutation'
import { createTag, updateTag } from '@/libs/api/tag.api'
import { errorTagMessage } from '@/messages/tagMessages'
import { Tag, TagFormType } from '@/types/app/tag.type'

interface Props {
  initialData?: Tag
  onSuccess?: () => void
}

export const useTagFormSubmit = ({ initialData, onSuccess }: Props) => {
  const isUpdate = !!initialData

  return useFormMutation<TagFormType & { id?: string }>({
    createApi: async (formData: TagFormType) => {
      const response = await createTag(formData)

      return { status: response.status, data: { id: response.data?.tag?.id } }
    },

    updateApi: async (tagId: string, formData: Partial<TagFormType>) => {
      return updateTag(Number(tagId), formData as Partial<TagFormType>)
    },
    errorMessages: errorTagMessage,
    successMessage: isUpdate ? 'تگ با موفقیت به‌روزرسانی شد' : 'تگ با موفقیت ایجاد شد',
    initialData: initialData ? ({ ...initialData, id: String(initialData.id) } as any) : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

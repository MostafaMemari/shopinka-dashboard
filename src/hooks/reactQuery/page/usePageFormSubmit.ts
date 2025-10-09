'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { Page, PageFormType } from '@/types/app/page.type'
import { createPage, updatePage } from '@/libs/api/page.api'
import { useFormMutation } from '@/hooks/useFormMutation'
import { errorPageMessage } from '@/messages/pageMessages'

interface UsePageFormProps {
  initialData?: Page
  onSuccess?: () => void
}

export const usePageFormSubmit = ({ initialData, onSuccess }: UsePageFormProps) => {
  const isUpdate = !!initialData

  return useFormMutation<PageFormType & { id?: string }>({
    createApi: async (formData: PageFormType) => {
      const response = await createPage(formData)

      return { status: response.status, data: { id: response.data?.page?.id } }
    },

    updateApi: async (pageId: string, formData: Partial<PageFormType>) => {
      return updatePage(Number(pageId), formData as Partial<PageFormType>)
    },
    errorMessages: errorPageMessage,
    successMessage: isUpdate ? 'برگه با موفقیت به‌روزرسانی شد' : 'برگه با موفقیت ایجاد شد',
    initialData: initialData ? ({ ...initialData, id: String(initialData.id) } as any) : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

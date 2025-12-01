'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { useFormMutation } from '@/hooks/useFormMutation'
import { createFont, updateFont } from '@/libs/api/font.api'
import { errorFontMessage } from '@/messages/fontMessages'
import { Font, FontFormType } from '@/types/app/font.type'

interface UseFontFormProps {
  initialData?: Font
}

export const useFontFormSubmit = ({ initialData }: UseFontFormProps) => {
  const isUpdate = !!initialData

  return useFormMutation<FontFormType & { id?: string }>({
    createApi: createFont,
    updateApi: updateFont,
    errorMessages: errorFontMessage,
    queryKey: QueryKeys.Fonts,
    successMessage: isUpdate ? 'فونت با موفقیت به‌روزرسانی شد' : 'فونت با موفقیت ایجاد شد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate
  })
}

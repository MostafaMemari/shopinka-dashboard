'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { Blog } from '@/types/app/blog.type'
import { createAttribute, updateAttribute } from '@/libs/api/attributes.api'
import { errorAttributeMessage } from '@/messages/attributeMessages'
import { Attribute, AttributeFormType } from '@/types/app/productAttributes.type'
import { useFormMutation } from '@/hooks/useFormMutation'

interface useAttributeFormSubmitProps {
  initialData?: Attribute
  onSuccess?: () => void
}

export const useAttributeFormSubmit = ({ initialData, onSuccess }: useAttributeFormSubmitProps) => {
  const isUpdate = !!initialData

  return useFormMutation<AttributeFormType & { id?: string }>({
    createApi: createAttribute,
    updateApi: updateAttribute,
    errorMessages: errorAttributeMessage,
    queryKey: QueryKeys.Attributes,
    successMessage: isUpdate ? 'ویژگی با موفقیت به‌روزرسانی شد' : 'ویژگی با موفقیت ثبت شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    errorMessage: isUpdate ? 'خطایی در به‌روزرسانی ویژگی رخ داد' : 'خطای سیستمی رخ داد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate,

    preprocessData: (data: AttributeFormType) => {
      const cleanedData = { ...data }

      if (!cleanedData.description) cleanedData.description = null

      return cleanedData as AttributeFormType
    },
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

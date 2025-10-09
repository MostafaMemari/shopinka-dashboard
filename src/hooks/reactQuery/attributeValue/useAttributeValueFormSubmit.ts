'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { errorAttributeMessage } from '@/messages/attributeMessages'
import { AttributeValueFormType, AttributeValue } from '@/types/app/productAttributes.type'
import { useFormMutation } from '@/hooks/useFormMutation'
import { createAttributeValues, updateAttributeValues } from '@/libs/api/attributeValues.api'

interface useAttributeFormSubmitProps {
  initialData?: AttributeValue
  onSuccess?: () => void
}

export const useAttributeValueFormSubmit = ({ initialData, onSuccess }: useAttributeFormSubmitProps) => {
  const isUpdate = !!initialData

  return useFormMutation<AttributeValueFormType & { id?: string }>({
    createApi: createAttributeValues,
    updateApi: updateAttributeValues,
    errorMessages: errorAttributeMessage,
    queryKey: QueryKeys.Attributes,
    successMessage: isUpdate ? 'متغیر با موفقیت به‌روزرسانی شد' : 'متغیر با موفقیت ثبت شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    errorMessage: isUpdate ? 'خطایی در به‌روزرسانی متغیر رخ داد' : 'خطای سیستمی رخ داد',
    initialData: initialData
      ? {
          ...initialData,
          id: String(initialData.id),
          attributeId: String(initialData.attributeId)
        }
      : undefined,
    isUpdate,

    preprocessData: (data: AttributeValueFormType) => {
      const cleanedData = { ...data }

      return cleanedData as AttributeValueFormType
    },
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

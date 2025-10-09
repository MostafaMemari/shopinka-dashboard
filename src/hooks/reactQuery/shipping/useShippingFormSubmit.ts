'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { useFormMutation } from '@/hooks/useFormMutation'
import { createShipping, updateShipping } from '@/libs/api/shipping.api'
import { errorShippingMessage } from '@/messages/shippingMessages'
import { Shipping, ShippingFormType } from '@/types/app/shipping.type'

interface UseShippingFormProps {
  initialData?: Shipping
}

export const useShippingFormSubmit = ({ initialData }: UseShippingFormProps) => {
  const isUpdate = !!initialData

  return useFormMutation<ShippingFormType & { id?: string }>({
    createApi: createShipping,
    updateApi: updateShipping,
    errorMessages: errorShippingMessage,
    queryKey: QueryKeys.Shippings,
    successMessage: isUpdate ? 'حمل و نقل با موفقیت به‌روزرسانی شد' : 'حمل و نقل با موفقیت ایجاد شد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate
  })
}

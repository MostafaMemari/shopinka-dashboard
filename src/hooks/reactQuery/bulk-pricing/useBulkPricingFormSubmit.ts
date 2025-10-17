'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { useFormMutation } from '@/hooks/useFormMutation'
import { createBulkPricing, updateBulkPricing } from '@/libs/api/bulkPricing.api'
import { errorBulkPricingMessage } from '@/messages/bulkPricingMessages'
import { BulkPricingFormType, BulkPricingItem } from '@/types/app/bulkPricing.type'

interface UseBulkPricingFormProps {
  initialData?: BulkPricingItem
  isUpdate?: boolean
  onSuccess?: () => void
}

export const useBulkPricingFormSubmit = ({ initialData, onSuccess, isUpdate }: UseBulkPricingFormProps) => {
  return useFormMutation<BulkPricingFormType & { id?: string }>({
    createApi: async (formData: BulkPricingFormType) => {
      const response = await createBulkPricing(formData)

      return { status: response.status, data: { id: response.data?.page?.id } }
    },

    updateApi: async (pageId: string, formData: Partial<BulkPricingFormType>) => {
      return updateBulkPricing(Number(pageId), formData as Partial<BulkPricingFormType>)
    },
    errorMessages: errorBulkPricingMessage,
    queryKey: [QueryKeys.BulkPricing, QueryKeys.BulkPricings],
    successMessage: isUpdate ? 'فروش عمده با موفقیت به‌روزرسانی شد' : 'فروش عمده با موفقیت ایجاد شد',
    initialData: initialData ? ({ ...initialData, id: String(initialData.id) } as any) : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

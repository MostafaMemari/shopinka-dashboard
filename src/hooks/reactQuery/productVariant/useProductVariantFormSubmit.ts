'use client'

import { createProductVariant, getProductVariants, updateProductVariant } from '@/libs/api/productVariants.api'
import { errorProductVariantMessage } from '@/messages/productVariant.message'
import { ProductVariant, ProductVariantForm } from '@/types/app/productVariant.type'
import { QueryKeys } from '@/types/enums/query-keys'
import { useFormSubmit } from '../../useFormSubmit'

interface UseProductVariantFormProps {
  productId: number
  initialData?: ProductVariant
  onSuccess?: () => void
}

export const useProductVariantFormSubmit = ({ initialData, productId, onSuccess }: UseProductVariantFormProps) => {
  const isUpdate = !!initialData

  return useFormSubmit<ProductVariantForm>({
    createApi: async (formData: ProductVariantForm) => {
      const response = await createProductVariant(productId, formData)

      return { status: response.status, data: { id: response.data?.product?.id } }
    },
    updateApi: (id, data) => updateProductVariant(Number(id), data),
    errorMessages: errorProductVariantMessage,
    queryKey: [QueryKeys.ProductVariants],
    successMessage: isUpdate ? 'متغییر با موفقیت به‌روزرسانی شد' : 'متغییر با موفقیت ایجاد شد',
    initialData: initialData ? { ...initialData, id: String(initialData.id), attributeValueIds: [] } : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

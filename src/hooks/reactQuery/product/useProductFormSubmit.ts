'use client'

import { QueryKeys } from '@/types/enums/query-keys'
import { Product, ProductFormType, ProductType } from '@/types/app/product.type'
import { createProduct, updateProduct } from '@/libs/api/product.api'

import { errorProductMessage } from '@/messages/product.message'
import { useFormSubmit } from '@/hooks/useFormSubmit'

interface UseProductFormProps {
  initialData?: Product
  onSuccess?: () => void
}

export const useProductFormSubmit = ({ initialData, onSuccess }: UseProductFormProps) => {
  const isUpdate = !!initialData

  return useFormSubmit<ProductFormType & { id?: string }>({
    createApi: async (formData: ProductFormType) => {
      const response = await createProduct(formData as ProductFormType)

      return { status: response.status, data: { id: response.data?.product?.id } }
    },

    updateApi: async (productId: string, formData: Partial<ProductFormType>) => {
      return updateProduct(Number(productId), formData as Partial<ProductFormType>)
    },

    errorMessages: errorProductMessage,
    queryKey: [QueryKeys.Products, QueryKeys.Product],
    successMessage: isUpdate ? 'محصول با موفقیت به‌روزرسانی شد' : 'محصول با موفقیت ایجاد شد',
    initialData: initialData
      ? ({
          ...initialData,
          id: String(initialData.id),
          type: initialData.type || ProductType.SIMPLE,
          galleryImageIds: initialData.galleryImages?.map(img => img.id) || [],
          categoryIds: initialData.categories?.map(category => category.id) || [],
          attributeIds: initialData.attributes?.map(attribute => attribute.id) || [],
          tagIds: initialData.tags?.map(tag => tag.id) || [],
          seo_canonicalUrl: initialData.seoMeta?.canonicalUrl,
          seo_description: initialData.seoMeta?.description,
          seo_keywords: initialData.seoMeta?.keywords,
          seo_robotsTag: initialData.seoMeta?.robotsTag,
          seo_title: initialData.seoMeta?.title
        } as any)
      : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}

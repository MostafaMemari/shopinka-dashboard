'use client'

import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { Product, ProductFormType, ProductType } from '@/types/app/product.type'
import { createProduct, getProductById, getProducts, updateProduct } from '@/libs/api/product.api'

import { errorProductMessage } from '@/messages/product.message'
import { useFormSubmit } from '../useFormSubmit'

export function useProducts({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchProducts = () => getProducts(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Products, params],
    queryFn: fetchProducts,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

export function useProductById({ enabled = true, productId, staleTime = 1 * 60 * 1000 }: QueryOptions & { productId: number }) {
  const fetchProduct = () => getProductById(Number(productId)).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Product, productId],
    queryFn: fetchProduct,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseProductFormProps {
  initialData?: Product
  onSuccess?: () => void
}

export const useProductForm = ({ initialData, onSuccess }: UseProductFormProps) => {
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

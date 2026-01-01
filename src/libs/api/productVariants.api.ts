import { ProductVariant, ProductVariantForm } from '@/types/app/productVariant.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

export const getProductVariants = async (params?: Record<string, string>) => {
  const res = await serverApiFetch<ProductVariant[]>('/product-variant', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getProductVariantById = async (id: number) => {
  const res = await serverApiFetch<ProductVariant>(`/product-variant/${id}`, { method: 'GET' })

  return unwrapApi(res)
}

export const updateProductVariant = async (id: number, data: Partial<ProductVariantForm>) => {
  const res = await serverApiFetch<ProductVariant>(`/product-variant/${id}`, {
    method: 'PATCH',
    body: data
  })

  return unwrapApi(res)
}

export const createProductVariant = async (productId: number, data: ProductVariantForm) => {
  const res = await serverApiFetch<{ product: ProductVariant }>('/product-variant', {
    method: 'POST',
    body: { ...data, productId }
  })

  return unwrapApi(res)
}

export const removeProductVariant = async (id: string) => {
  const res = await serverApiFetch<{ message: string; product: ProductVariant }>(`/product-variant/${id}`, {
    method: 'DELETE'
  })

  return unwrapApi(res)
}

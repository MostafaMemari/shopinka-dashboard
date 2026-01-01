'use server'

import { Product, ProductFormType } from '@/types/app/product.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'
import { handleSeoSave } from '../services/seo/seo.service'
import { showToast } from '@/utils/showToast'
import { generateProductSeoDescription } from '@/hooks/reactQuery/seoDescriptionGenerators'
import { SeoMetaTargetType, type SeoForm } from '@/types/app/seo.type'

export const getProducts = async (params?: Record<string, string | boolean>) => {
  const res = await serverApiFetch<Product[]>('/product/admin', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getProductById = async (id: number) => {
  const res = await serverApiFetch<Product>(`/product/${id}`, { method: 'GET' })

  return unwrapApi(res)
}

export const defaultVariantProduct = async (id: number, variantId: number | null) => {
  const res = await serverApiFetch<Product>(`/product/${id}/default-variant`, {
    method: 'PATCH',
    body: { variantId }
  })

  return unwrapApi(res)
}

export const updateProduct = async (id: number, data: Partial<ProductFormType>) => {
  const res = await serverApiFetch<Product>(`/product/${id}`, {
    method: 'PATCH',
    body: data
  })

  if (res.status === 200) await handleSeo(Number(id), data, true)

  return unwrapApi(res)
}

export const createProduct = async (data: ProductFormType) => {
  const res = await serverApiFetch<{ product: Product & { id: number } }>('/product', {
    method: 'POST',
    body: data
  })

  if (res.ok && res.data?.product?.id) {
    await handleSeo(res.data.product.id, data)
  }

  return unwrapApi(res)
}

export const removeProduct = async (id: string) => {
  const res = await serverApiFetch<{ message: string; product: Product }>(`/product/${id}`, {
    method: 'DELETE'
  })

  return unwrapApi(res)
}

// ---------- SEO Handler ----------
const handleSeo = async (productId: number, data: Partial<ProductFormType>, isUpdate?: boolean) => {
  const seoData: Partial<SeoForm> = isUpdate
    ? {
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_robotsTag: data.seo_robotsTag
      }
    : {
        seo_title: data.seo_title || data.name,
        seo_description: data.seo_description || generateProductSeoDescription({ title: data.name, description: data.shortDescription ?? '' }),
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl || data.slug,
        seo_robotsTag: data.seo_robotsTag
      }

  const seoResponse = await handleSeoSave(SeoMetaTargetType.product, productId, seoData as SeoForm)

  if (seoResponse.status !== 200 && seoResponse.status !== 201) {
    showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

    return false
  }

  return true
}

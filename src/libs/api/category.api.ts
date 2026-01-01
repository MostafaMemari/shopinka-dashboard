import { generateCategorySeoDescription } from '@/hooks/reactQuery/seoDescriptionGenerators'
import { Category, CategoryFormType } from '@/types/app/category.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

import { handleSeoSave } from '../services/seo/seo.service'
import { showToast } from '@/utils/showToast'
import { SeoForm, SeoMetaTargetType } from '@/types/app/seo.type'

export const getCategories = async (params?: Record<string, string | boolean | number>) => {
  const res = await serverApiFetch<Category[]>('/category', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getCategoryById = async (id: number) => {
  const res = await serverApiFetch<Category>(`/category/${id}`)

  return unwrapApi(res)
}

export const updateCategory = async (id: number, data: Partial<CategoryFormType>) => {
  const res = await serverApiFetch<Category>(`/category/${id}`, {
    method: 'PATCH',
    body: data
  })

  if (id) {
    await handleSeo(id, data, true)
  } else {
    showToast({ type: 'error', message: 'خطا در دریافت آیدی دسته بندی' })
  }

  return unwrapApi(res)
}

export const createCategory = async (data: CategoryFormType) => {
  const res = await serverApiFetch<{ category: Category }>('/category', {
    method: 'POST',
    body: data
  })

  if (res.ok && (res.status === 200 || res.status === 201)) {
    await handleSeo(res.data.category.id, data)
  }

  return unwrapApi(res)
}

export const removeCategory = async (id: string) => {
  const res = await serverApiFetch<{ message: string; category: CategoryFormType }>(`/category/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}

const handleSeo = async (categoryId: number, data: Partial<CategoryFormType>, isUpdate?: boolean) => {
  const seoData = isUpdate
    ? {
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_robotsTag: data.seo_robotsTag
      }
    : {
        seo_title: data.seo_title || data.name,
        seo_description:
          data.seo_description ||
          generateCategorySeoDescription({
            name: data.name,
            description: data.description ?? ''
          }),
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_robotsTag: data.seo_robotsTag
      }

  const seoResponse = await handleSeoSave(SeoMetaTargetType.category, categoryId, seoData as SeoForm)

  if (seoResponse.status !== 200 && seoResponse.status !== 201) {
    showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

    return false
  }

  return true
}

import { SeoForm, SeoMetaTargetType } from '@/types/app/seo.type'
import { generateTagSeoDescription } from '@/hooks/reactQuery/seoDescriptionGenerators'
import { Tag, TagFormType } from '@/types/app/tag.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'
import { handleSeoSave } from '../services/seo/seo.service'
import { showToast } from '@/utils/showToast'

export const getTags = async (params?: Record<string, string | boolean>) => {
  const res = await serverApiFetch<Tag[]>('/tag', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getTagById = async (id: number) => {
  const res = await serverApiFetch<Tag>(`/tag/${id}`, { method: 'GET' })

  return unwrapApi(res)
}

export const updateTag = async (id: number, data: Partial<TagFormType>) => {
  const res = await serverApiFetch<Tag>(`/tag/${id}`, {
    method: 'PATCH',
    body: data
  })

  if (id) await handleSeo(Number(id), data, true)

  return unwrapApi(res)
}

export const createTag = async (data: TagFormType) => {
  const res = await serverApiFetch<{ tag: Tag | null }>('/tag', {
    method: 'POST',
    body: data
  })

  if (res.ok && res.data?.tag?.id) {
    await handleSeo(res.data.tag.id, data)
  }

  return unwrapApi(res)
}

export const removeTag = async (id: string) => {
  const res = await serverApiFetch<{ message: string; tag: Tag }>(`/tag/${id}`, {
    method: 'DELETE'
  })

  return unwrapApi(res)
}

const handleSeo = async (tagId: number, data: Partial<TagFormType>, isUpdate?: boolean) => {
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
          generateTagSeoDescription({
            name: data.name,
            description: data.description ?? ''
          }),
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_robotsTag: data.seo_robotsTag
      }

  const seoResponse = await handleSeoSave(SeoMetaTargetType.tag, tagId, seoData as SeoForm)

  if (seoResponse.status !== 200 && seoResponse.status !== 201) {
    showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

    return false
  }

  return true
}

import { generateBlogSeoDescription } from '@/hooks/reactQuery/seoDescriptionGenerators'
import { Blog, BlogFormType } from '@/types/app/blog.type'
import { serverApiFetch } from '@/libs/serverApiFetch'
import { unwrapApi } from '@/libs/helpers/unwrapApi'

import { blogFormSchema } from '../validators/blog.schema'
import { type InferType } from 'yup'
import { handleSeoSave } from '../services/seo/seo.service'
import { showToast } from '@/utils/showToast'
import { SeoForm, SeoMetaTargetType } from '@/types/app/seo.type'

type BlogForm = InferType<typeof blogFormSchema>

export const getBlogs = async (params?: Record<string, string | boolean>) => {
  const res = await serverApiFetch<Blog[]>('/blog', {
    method: 'GET',
    query: { ...params }
  })

  return unwrapApi(res)
}

export const getBlogById = async (id: number) => {
  const res = await serverApiFetch<Blog>(`/blog/${id}`, {
    method: 'GET'
  })

  return unwrapApi(res)
}

export const updateBlog = async (id: number, data: Partial<BlogFormType>) => {
  const res = await serverApiFetch<Blog>(`/blog/${id}`, {
    method: 'PATCH',
    body: data
  })

  if (res.ok && res.status === 200) {
    await handleSeo(id, data, true)
  }

  return unwrapApi(res)
}

export const createBlog = async (data: BlogFormType) => {
  const res = await serverApiFetch<{ blog: Blog & { id: number } }>('/blog', {
    method: 'POST',
    body: data
  })

  if (res.ok && (res.status === 200 || res.status === 201)) {
    await handleSeo(res.data.blog.id, data)
  }

  return unwrapApi(res)
}

export const removeBlog = async (id: string) => {
  const res = await serverApiFetch<{ message: string; blog: Blog }>(`/blog/${id}`, { method: 'DELETE' })

  return unwrapApi(res)
}

const handleSeo = async (blogId: number, data: Partial<BlogForm>, isUpdate?: boolean) => {
  const seoData = isUpdate
    ? {
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_robotsTag: data.seo_robotsTag
      }
    : {
        seo_title: data.seo_title || data.title,
        seo_description:
          data.seo_description ||
          generateBlogSeoDescription({
            title: data.title,
            description: data.content ?? ''
          }),
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_robotsTag: data.seo_robotsTag
      }

  const seoResponse = await handleSeoSave(SeoMetaTargetType.blog, blogId, seoData as SeoForm)

  if (seoResponse.status !== 200 && seoResponse.status !== 201) {
    showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

    return false
  }

  return true
}

'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { useFormSubmit } from '@/hooks/useFormSubmit'
import { createBlog, updateBlog } from '@/libs/api/blog.api'
import { Blog, BlogFormType } from '@/types/app/blog.type'
import { errorBlogMessage } from '@/messages/blog.message'

interface UseBlogFormProps {
  initialData?: Blog
  onSuccess?: () => void
}

export const useBlogFormSubmit = ({ initialData, onSuccess }: UseBlogFormProps) => {
  const isUpdate = !!initialData

  return useFormSubmit<BlogFormType & { id?: string }>({
    createApi: async (formData: BlogFormType) => {
      const response = await createBlog(formData)

      return { status: response.status, data: { id: response.data?.blog?.id } }
    },

    updateApi: async (blogId: string, formData: Partial<BlogFormType>) => {
      return updateBlog(Number(blogId), formData as Partial<BlogFormType>)
    },

    errorMessages: errorBlogMessage,
    queryKey: [QueryKeys.Blog],
    successMessage: isUpdate ? 'مقاله با موفقیت به‌روزرسانی شد' : 'مقاله با موفقیت ایجاد شد',
    initialData: initialData
      ? ({
          ...initialData,
          id: String(initialData.id),
          categoryIds: initialData.categories?.map(category => category.id) || [],
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

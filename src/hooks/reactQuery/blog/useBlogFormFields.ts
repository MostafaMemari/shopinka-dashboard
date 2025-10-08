import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { transformToStringArray } from '@/utils/transformToStringArray'
import { RobotsTag } from '@/types/enums/robotsTag'
import { Blog, BlogFormType, BlogStatus } from '@/types/app/blog.type'
import { blogFormSchema } from '@/libs/validators/blog.schema'

interface UseBlogFormProps {
  initialData?: Blog
}

export const useBlogFormFields = ({ initialData }: UseBlogFormProps) => {
  const defaultValues: BlogFormType = {
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    content: initialData?.content ?? '',
    readingTime: initialData?.readingTime ?? null,

    status: initialData?.status ?? BlogStatus.DRAFT,
    mainImageId: initialData?.mainImageId ?? null,

    categoryIds: initialData?.categories?.map(category => category.id) ?? [],
    tagIds: initialData?.tags?.map(tag => tag.id) ?? [],
    seo_title: initialData?.seoMeta?.title ?? '',
    seo_description: initialData?.seoMeta?.description ?? '',
    seo_keywords: transformToStringArray(initialData?.seoMeta?.keywords) ?? [],
    seo_canonicalUrl: initialData?.seoMeta?.canonicalUrl ?? '',
    seo_robotsTag: initialData?.seoMeta?.robotsTag ?? RobotsTag.INDEX_FOLLOW
  }

  const methods = useForm<BlogFormType>({
    resolver: yupResolver(blogFormSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}

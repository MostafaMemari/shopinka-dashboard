import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Tag, TagFormType, TagType } from '@/types/app/tag.type'
import { tagFormSchema } from '@/libs/validators/tag.schema'
import { RobotsTag } from '@/types/enums/robotsTag'

interface Props {
  initialData?: Tag
}

export const useTagFormFields = ({ initialData }: Props) => {
  const defaultValues: TagFormType = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    type: initialData?.type ?? TagType.BLOG,
    description: initialData?.description ?? null,
    tagIds: initialData?.tagIds ?? null,
    categoryIds: initialData?.categoryIds ?? null,
    thumbnailImageId: initialData?.thumbnailImageId ?? null,

    seo_title: initialData?.seoMeta?.title ?? '',
    seo_description: initialData?.seoMeta?.description ?? '',
    seo_keywords: initialData?.seoMeta?.keywords ?? [],
    seo_canonicalUrl: initialData?.seoMeta?.canonicalUrl ?? '',
    seo_robotsTag: initialData?.seoMeta?.robotsTag ?? RobotsTag.INDEX_FOLLOW
  }

  const methods = useForm<TagFormType>({
    resolver: yupResolver(tagFormSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}

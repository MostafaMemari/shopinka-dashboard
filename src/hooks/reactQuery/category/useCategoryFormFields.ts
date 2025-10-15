import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { categoryFormSchema } from '@/libs/validators/category.schema'
import { RobotsTag } from '@/types/enums/robotsTag'
import { Category, CategoryFormType, CategoryType } from '@/types/app/category.type'

interface Props {
  initialData?: Category
}

export const useCategoryFormFields = ({ initialData }: Props) => {
  const defaultValues: CategoryFormType = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    type: initialData?.type ?? CategoryType.PRODUCT,
    description: initialData?.description ?? null,
    parentId: initialData?.parentId ?? null,
    thumbnailImageId: initialData?.thumbnailImageId ?? null,

    seo_title: initialData?.seoMeta?.title ?? '',
    seo_description: initialData?.seoMeta?.description ?? '',
    seo_keywords: initialData?.seoMeta?.keywords ?? [],
    seo_canonicalUrl: initialData?.seoMeta?.canonicalUrl ?? '',
    seo_robotsTag: initialData?.seoMeta?.robotsTag ?? RobotsTag.INDEX_FOLLOW
  }

  const methods = useForm<CategoryFormType>({
    resolver: yupResolver(categoryFormSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}

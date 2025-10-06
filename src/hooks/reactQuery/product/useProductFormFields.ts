import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Product, ProductFormType, ProductStatus, ProductType } from '@/types/app/product.type'
import { transformToStringArray } from '@/utils/transformToStringArray'
import { RobotsTag } from '@/types/enums/robotsTag'
import { productFormSchema } from '@/libs/validators/product.schema'

interface UseProductFormProps {
  initialData?: Product
}

export const useProductFormFields = ({ initialData }: UseProductFormProps) => {
  const defaultValues: ProductFormType = {
    sku: initialData?.sku ?? '',
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    shortDescription: initialData?.shortDescription ?? '',
    quantity: initialData?.quantity ?? null,
    basePrice: initialData?.basePrice ?? null,
    salePrice: initialData?.salePrice ?? null,
    status: initialData?.status ?? ProductStatus.DRAFT,
    type: initialData?.type ?? ProductType.SIMPLE,
    mainImageId: initialData?.mainImageId ?? null,
    width: initialData?.width ?? null,
    height: initialData?.height ?? null,
    length: initialData?.length ?? null,
    weight: initialData?.weight ?? null,
    defaultVariantId: initialData?.defaultVariantId ?? null,
    galleryImageIds: initialData?.galleryImages?.map(galleryImage => galleryImage.id) ?? [],
    categoryIds: initialData?.categories?.map(category => category.id) ?? [],
    attributeIds: initialData?.attributes?.map(att => att.id) ?? [],
    tagIds: initialData?.tags?.map(tag => tag.id) ?? [],
    seo_title: initialData?.seoMeta?.title ?? '',
    seo_description: initialData?.seoMeta?.description ?? '',
    seo_keywords: transformToStringArray(initialData?.seoMeta?.keywords) ?? [],
    seo_canonicalUrl: initialData?.seoMeta?.canonicalUrl ?? '',
    seo_robotsTag: initialData?.seoMeta?.robotsTag ?? RobotsTag.INDEX_FOLLOW
  }

  const methods = useForm<ProductFormType & { defaultVariantId: number | null }>({
    resolver: yupResolver(productFormSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}

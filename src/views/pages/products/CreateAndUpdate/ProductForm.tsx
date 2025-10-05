'use client'

import { FormProvider, useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import { useProductForm } from '@/hooks/reactQuery/useProduct'
import LoadingSpinner from '@/components/LoadingSpinner'
import ProductFormTabs from './ProductFormTabs'
import { Product, type ProductFormType, ProductStatus, ProductType } from '@/types/app/product.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { productFormSchema } from '@/libs/validators/product.schema'
import { RobotsTag } from '@/types/enums/robotsTag'
import { transformToStringArray } from '@/utils/transformToStringArray'
import { ProductProvider } from './ProductContext'
import ProductAddHeader from './sections/ProductAddHeader'
import { useRouter } from 'next/navigation'

const ProductForm = ({ product }: { product?: Product }) => {
  const { isLoading, onSubmit } = useProductForm({ initialData: product })
  const router = useRouter()

  const defaultValues: ProductFormType = {
    sku: product?.sku ?? '',
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    shortDescription: product?.shortDescription ?? '',
    quantity: product?.quantity ?? null,
    basePrice: product?.basePrice ?? null,
    salePrice: product?.salePrice ?? null,
    status: product?.status ?? ProductStatus.DRAFT,
    type: product?.type ?? ProductType.SIMPLE,
    mainImageId: product?.mainImageId ?? null,
    galleryImageIds: product?.galleryImageIds ?? [],
    categoryIds: product?.categoryIds ?? [],
    attributeIds: product?.attributeIds ?? [],
    tagIds: product?.tagIds ?? [],
    width: product?.width ?? null,
    height: product?.height ?? null,
    length: product?.length ?? null,
    weight: product?.weight ?? null,
    defaultVariantId: product?.defaultVariantId ?? null,

    seo_title: product?.seoMeta?.title ?? '',
    seo_description: product?.seoMeta?.description ?? '',
    seo_keywords: transformToStringArray(product?.seoMeta?.keywords) ?? [],
    seo_canonicalUrl: product?.seoMeta?.canonicalUrl ?? '',
    seo_robotsTag: product?.seoMeta?.robotsTag ?? RobotsTag.INDEX_FOLLOW
  }

  const methods = useForm<ProductFormType & { defaultVariantId: number | null }>({
    resolver: yupResolver(productFormSchema),
    mode: 'onChange',
    defaultValues
  })

  const { setValue } = methods

  const handleHeaderButtonClick = (buttonType: 'cancel' | 'draft' | 'publish') => {
    switch (buttonType) {
      case 'cancel':
        router.push('/products')
        break
      case 'draft':
        setValue('status', ProductStatus.DRAFT)
        methods.handleSubmit(onSubmit)()
        window.location.reload()

        break
      case 'publish':
        setValue('status', ProductStatus.PUBLISHED)
        methods.handleSubmit(onSubmit)()
        window.location.reload()

        break
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <ProductProvider product={product}>
      <FormProvider {...methods}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <ProductAddHeader isUpdate={!!product} isLoading={isLoading} onButtonClick={handleHeaderButtonClick} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ProductFormTabs />
          </Grid>
        </Grid>
      </FormProvider>
    </ProductProvider>
  )
}

export default ProductForm

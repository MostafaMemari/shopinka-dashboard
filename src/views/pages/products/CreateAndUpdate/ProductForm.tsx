'use client'

import { FormProvider } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import LoadingSpinner from '@/components/LoadingSpinner'
import ProductFormTabs from './ProductFormTabs'
import { Product, ProductStatus } from '@/types/app/product.type'
import { ProductProvider } from './ProductContext'
import ProductAddHeader from './sections/ProductAddHeader'
import { useRouter } from 'next/navigation'
import { useProductFormSubmit } from '@/hooks/reactQuery/product/useProductFormSubmit'
import { useProductFormFields } from '@/hooks/reactQuery/product/useProductFormFields'

const ProductForm = ({ product }: { product?: Product; refetch?: () => void }) => {
  const { isLoading, onSubmit } = useProductFormSubmit({ initialData: product })
  const { methods } = useProductFormFields({ initialData: product })

  const router = useRouter()

  const handleHeaderButtonClick = (buttonType: 'cancel' | 'draft' | 'publish') => {
    switch (buttonType) {
      case 'cancel':
        router.push('/products')
        break
      case 'draft':
        methods.setValue('status', ProductStatus.DRAFT)
        methods.handleSubmit(onSubmit)()

        break
      case 'publish':
        methods.setValue('status', ProductStatus.PUBLISHED)
        methods.handleSubmit(onSubmit)()

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

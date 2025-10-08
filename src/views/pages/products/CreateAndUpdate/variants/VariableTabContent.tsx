'use client'

import { useState, useEffect, useMemo } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import VariantAccordion from './VariantAccordion'
import { ProductVariant } from '@/types/app/productVariant.type'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorState from '@/components/states/ErrorState'
import CreateProductVariantModal from './CreateProductVariant'
import { useProductVariants } from '@/hooks/reactQuery/productVariant/useProductVariants'

const VariableTabContent = ({ productId }: { productId: number }) => {
  const { data, isLoading, isFetching, error, refetch } = useProductVariants({
    enabled: !!productId,
    params: { take: 50, productId, includeAttributeValues: true, includeMainImage: true }
  })

  const ProductVariants: ProductVariant[] = useMemo(() => data?.data?.items || [], [data])

  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [expanded, setExpanded] = useState<string | false>(false)

  useEffect(() => {
    setVariants(ProductVariants)
  }, [ProductVariants])

  const existingAttributeCombinations = useMemo(() => {
    return ProductVariants.map(variant =>
      variant.attributeValues
        ?.map(attr => attr.id)
        .sort()
        .join(',')
    ).filter((combo): combo is string => combo !== undefined)
  }, [ProductVariants])

  if (isLoading || isFetching) return <LoadingSpinner />
  if (error) return <ErrorState onRetry={() => refetch()} />

  return (
    <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardHeader
        title='مدیریت متغیرهای محصول'
        action={
          <CreateProductVariantModal productId={String(productId)} existingAttributeCombinations={existingAttributeCombinations}>
            <Button variant='contained' startIcon={<AddIcon />}>
              افزودن متغیر
            </Button>
          </CreateProductVariantModal>
        }
      />
      <CardContent>
        {ProductVariants.length === 0 ? (
          <Typography color='text.secondary'>هیچ متغیری وجود ندارد. ویژگی‌ها را انتخاب کنید و متغیر اضافه کنید</Typography>
        ) : (
          variants.map(variant => (
            <VariantAccordion
              key={variant.id}
              variant={variant}
              expanded={expanded === String(variant.id)}
              onChange={() => setExpanded(expanded === String(variant.id) ? false : String(variant.id))}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default VariableTabContent

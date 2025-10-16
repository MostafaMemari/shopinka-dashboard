'use client'

import Grid from '@mui/material/Grid2'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Card, CardContent, CardHeader, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import FormField from '@/components/form/FormField'
import { Controller, FormProvider } from 'react-hook-form'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import CategoryHeader from './CategoryHeader'
import { useCategoryFormSubmit } from '@/hooks/reactQuery/category/useCategoryFormSubmit'
import { Category, CategoryType } from '@/types/app/category.type'
import { useCategoryFormFields } from '@/hooks/reactQuery/category/useCategoryFormFields'
import CategoryMainImage from './CategoryMainImage'
import { useCategories } from '@/hooks/reactQuery/category/useCategory'
import { useMemo } from 'react'
import CategorySelect from './CategorySelect'
import CategoryFormTabs from './CategoryFormTabs'

const CategoryView = ({ category }: { category?: Category }) => {
  const isUpdate = !!category
  const { isPending, mutate } = useCategoryFormSubmit({ initialData: category })
  const { methods } = useCategoryFormFields({ initialData: category })

  const { watch, control } = methods

  const { data, isLoading } = useCategories({
    params: {
      take: 1000,
      includeOnlyTopLevel: true,
      includeChildren: true,
      type: watch('type') === CategoryType.PRODUCT ? CategoryType.PRODUCT : watch('type') === CategoryType.BLOG ? CategoryType.BLOG : undefined,
      childrenDepth: 6
    },
    enabled: watch('type') === CategoryType.PRODUCT || watch('type') === CategoryType.BLOG
  })

  const router = useRouter()

  const onSubmit = methods.handleSubmit(data =>
    mutate(data, {
      onSuccess: res => {
        if (!isUpdate) router.push(`/categories/edit?id=${res.data.id}`)
      }
    })
  )

  const categories: Category[] = useMemo(() => data?.data?.items || [], [data])

  if (isPending) return <LoadingSpinner />

  return (
    <FormProvider {...methods}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CategoryHeader isUpdate={!!category} isLoading={isPending} onButtonClick={onSubmit} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CategoryFormTabs control={control} categories={categories} />
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default CategoryView

'use client'

import Grid from '@mui/material/Grid2'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Card, CardContent, CardHeader, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import FormField from '@/components/form/FormField'
import { Controller } from 'react-hook-form'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import CategoryHeader from './CategoryHeader'
import { useCategoryFormSubmit } from '@/hooks/reactQuery/category/useCategoryFormSubmit'
import { Category, CategoryType } from '@/types/app/category.type'
import { useCategoryFormFields } from '@/hooks/reactQuery/category/useCategoryFormFields'
import CategoryMainImage from './CategoryMainImage'
import { useCategories } from '@/hooks/reactQuery/category/useCategory'
import { useMemo } from 'react'
import CategorySelect from './CategorySelect'

const CategoryView = ({ category }: { category?: Category }) => {
  const isUpdate = !!category
  const { isPending, mutate } = useCategoryFormSubmit({ initialData: category })
  const { methods } = useCategoryFormFields({ initialData: category })

  const {
    control,
    watch,
    formState: { errors }
  } = methods

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
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <CategoryHeader isUpdate={!!category} isLoading={isPending} onButtonClick={onSubmit} />
      </Grid>

      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader title='اطلاعات برگه' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12 }}>
                  <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormField control={control} errors={errors} name='name' label='عنوان تگ' placeholder='نام تگ را وارد کنید' />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormField control={control} errors={errors} name='slug' label='نامک (Slug)' placeholder='نامک برگه را وارد کنید' />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormField control={control} errors={errors} name='type' label='نوع دسته‌بندی' select placeholder='لطفا نوع دسته را انتخاب کنید'>
                        <MenuItem value={CategoryType.PRODUCT}>محصول</MenuItem>
                        <MenuItem value={CategoryType.BLOG}>وبلاگ</MenuItem>
                      </FormField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <CategorySelect categories={categories} control={control} errors={errors} isLoading={isLoading} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <RichTextEditor label='توضیحات (اختیاری)' placeholder='توضیحات برچسب' value={field.value || ''} onChange={field.onChange} />}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CategoryMainImage control={control} mainImage={category?.thumbnailImage} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CategoryView

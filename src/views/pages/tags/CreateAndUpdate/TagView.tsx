'use client'

import Grid from '@mui/material/Grid2'
import LoadingSpinner from '@/components/LoadingSpinner'
import TagAddHeader from './TagAddHeader'
import { Tag, TagType } from '@/types/app/tag.type'
import { useTagFormSubmit } from '@/hooks/reactQuery/tag/useTagFormSubmit'
import { useTagFormFields } from '@/hooks/reactQuery/tag/useTagFormFields'
import { Card, CardContent, CardHeader, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import FormField from '@/components/form/FormField'
import { Controller } from 'react-hook-form'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import TagMainImage from './TagMainImage'

const TagView = ({ tag }: { tag?: Tag }) => {
  const isUpdate = !!tag
  const { isPending, mutate } = useTagFormSubmit({ initialData: tag })
  const { methods } = useTagFormFields({ initialData: tag })
  const router = useRouter()

  const {
    control,
    formState: { errors }
  } = methods

  const onSubmit = methods.handleSubmit(data =>
    mutate(data, {
      onSuccess: res => {
        if (!isUpdate) router.push(`/tags/edit?id=${res.data.id}`)
      }
    })
  )

  if (isPending) return <LoadingSpinner />

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <TagAddHeader isUpdate={!!tag} isLoading={isPending} onButtonClick={onSubmit} />
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

                    <FormField control={control} errors={errors} name='type' label='نوع دسته‌بندی' select placeholder='لطفا نوع دسته را انتخاب کنید'>
                      <MenuItem value={TagType.PRODUCT}>محصول</MenuItem>
                      <MenuItem value={TagType.BLOG}>وبلاگ</MenuItem>
                    </FormField>
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
          <TagMainImage control={control} mainImage={tag?.thumbnailImage} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TagView

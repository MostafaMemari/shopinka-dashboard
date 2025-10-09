'use client'

import Grid from '@mui/material/Grid2'
import LoadingSpinner from '@/components/LoadingSpinner'
import PageAddHeader from './PageAddHeader'
import { Page } from '@/types/app/page.type'
import { usePageFormSubmit } from '@/hooks/reactQuery/page/usePageFormSubmit'
import { usePageFormFields } from '@/hooks/reactQuery/page/usePageFormFields'
import { Card, CardContent, CardHeader } from '@mui/material'
import { useRouter } from 'next/navigation'
import FormField from '@/components/form/FormField'

const PageView = ({ page }: { page?: Page }) => {
  const isUpdate = !!page
  const { isPending, mutate } = usePageFormSubmit({ initialData: page })
  const { methods } = usePageFormFields({ initialData: page })
  const router = useRouter()

  const {
    control,
    formState: { errors }
  } = methods

  const onSubmit = methods.handleSubmit(data =>
    mutate(data, {
      onSuccess: res => {
        if (!isUpdate) router.push(`/pages/edit?id=${res.data.id}`)
      }
    })
  )

  if (isPending) return <LoadingSpinner />

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <PageAddHeader isUpdate={!!page} isLoading={isPending} onButtonClick={onSubmit} />
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
                      <FormField control={control} errors={errors} name='name' label='عنوان برگه' placeholder='نام برگه را وارد کنید' />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormField control={control} errors={errors} name='slug' label='نامک (Slug)' placeholder='نامک برگه را وارد کنید' />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormField type='richtext' control={control} errors={errors} name='description' label='توضیحات (اختیاری)' placeholder='توضیحات برگه را وارد کنید' />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PageView

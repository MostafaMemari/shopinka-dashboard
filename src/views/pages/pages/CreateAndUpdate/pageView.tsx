'use client'

import Grid from '@mui/material/Grid2'
import LoadingSpinner from '@/components/LoadingSpinner'
import PageAddHeader from './PageAddHeader'
import { Page } from '@/types/app/page.type'
import { usePageFormSubmit } from '@/hooks/reactQuery/page/usePageFormSubmit'
import { usePageFormFields } from '@/hooks/reactQuery/page/usePageFormFields'
import PageForm from './PageForm'
import { Card, CardContent, CardHeader } from '@mui/material'
import { useRouter } from 'next/navigation'

const PageView = ({ page }: { page?: Page }) => {
  const isUpdate = !!page
  const { isPending, mutate } = usePageFormSubmit({ initialData: page })
  const { methods } = usePageFormFields({ initialData: page })
  const router = useRouter()

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

      <Card>
        <CardHeader title='اطلاعات برگه' />
        <CardContent>
          <Grid container spacing={6}>
            <Grid size={12}>
              <PageForm control={methods?.control} errors={methods?.formState?.errors} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PageView

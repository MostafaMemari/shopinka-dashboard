'use client'

import Grid from '@mui/material/Grid2'
import FormField from '@/components/form/FormField'

interface PageFormProps {
  control: any
  errors: any
}

const PageForm = ({ control, errors }: PageFormProps) => {
  return (
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
  )
}

export default PageForm

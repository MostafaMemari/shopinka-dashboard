'use client'

import Grid from '@mui/material/Grid2'
import { Category } from '@/types/app/category.type'
import FormField from '@/components/form/FormField'

interface CategoryFormProps {
  category?: Category
}

const CategoryForm = ({}: CategoryFormProps) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={6}>
          <FormField name='name' label='نام دسته بندی' placeholder='نام دسته بندی را وارد کنید' />
          <FormField name='slug' label='نامک (Slug)' placeholder='نامک دسته‌بندی را وارد کنید' />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CategoryForm

'use client'

import Grid from '@mui/material/Grid2'
import CategoryThumbnailImage from './CategoryThumbnailImage'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { Category, CategoryType } from '@/types/app/category.type'
import { MenuItem } from '@mui/material'
import FormField from '@/components/form/FormField'
import SeoFormWithContext from '@/components/seo/context/SeoFormWithContext'

interface CategoryFormProps {
  isLoading: boolean
  category?: Category
}

const CategoryForm = ({ isLoading, category }: CategoryFormProps) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setTabValue(newValue)
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label='category form tabs'>
          <Tab label='اطلاعات اصلی' id='tab-0' aria-controls='tabpanel-0' />
          <Tab label='سئو' id='tab-1' aria-controls='tabpanel-1' />
        </Tabs>
      </Box>
      <Box sx={{ mt: 4 }}>
        {tabValue === 0 && (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CategoryThumbnailImage isLoading={isLoading} category={category} />

              <Grid container spacing={6}>
                <FormField name='name' label='نام دسته بندی' placeholder='نام دسته بندی را وارد کنید' />
                <FormField name='slug' label='نامک (Slug)' placeholder='نامک دسته‌بندی را وارد کنید' />

                <FormField name='type' label='نوع دسته‌بندی' select>
                  <MenuItem value={CategoryType.PRODUCT}>محصول</MenuItem>
                  <MenuItem value={CategoryType.BLOG}>وبلاگ</MenuItem>
                </FormField>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField name='description' label='توضیحات (اختیاری)' placeholder='توضیحات دسته‌بندی' type='richtext' />
            </Grid>
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 8 }}>
              <SeoFormWithContext />
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  )
}

export default CategoryForm

'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import SeoTabContent from '@/views/pages/blogs/CreateAndUpdate/SeoTabContent'
import CategoryMainImage from './CategoryMainImage'
import { Card, CardContent, CardHeader, MenuItem } from '@mui/material'
import FormField from '@/components/form/FormField'
import CategorySelect from './CategorySelect'
import { Category, CategoryType } from '@/types/app/category.type'
import { Controller } from 'react-hook-form'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'

interface Props {
  control: any
  categories: Category[]
  category?: Category
}

const CategoryFormTabs = ({ control, categories, category }: Props) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label='blog form tabs'>
          <Tab label='اطلاعات اصلی' id='tab-0' aria-controls='tabpanel-0' />
          <Tab label='سئو' id='tab-1' aria-controls='tabpanel-1' />
        </Tabs>
      </Box>
      <Grid container spacing={6}>
        {tabValue === 0 && (
          <>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Card>
                  <CardHeader title='اطلاعات برگه' />

                  <CardContent>
                    <Grid container spacing={6}>
                      <Grid size={{ xs: 12 }}>
                        <Grid container spacing={6}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <FormField name='name' label='عنوان تگ' placeholder='نام تگ را وارد کنید' />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <FormField name='slug' label='نامک (Slug)' placeholder='نامک برگه را وارد کنید' />
                          </Grid>

                          <Grid size={{ xs: 12, md: 6 }}>
                            <FormField name='type' label='نوع دسته‌بندی' select placeholder='لطفا نوع دسته را انتخاب کنید'>
                              <MenuItem value={CategoryType.PRODUCT}>محصول</MenuItem>
                              <MenuItem value={CategoryType.BLOG}>وبلاگ</MenuItem>
                            </FormField>
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <CategorySelect categories={categories} />
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
          </>
        )}
        {tabValue === 1 && (
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <SeoTabContent />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default CategoryFormTabs

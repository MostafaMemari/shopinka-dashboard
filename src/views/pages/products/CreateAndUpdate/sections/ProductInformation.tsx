'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

import FormField from '@/components/form/FormField'

const ProductInformation = () => {
  return (
    <Card>
      <CardHeader title='اطلاعات محصول' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid size={{ xs: 12 }}>
            <FormField name='name' label='نام محصول' placeholder='لطفا نام محصول را وارد کنید' />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField name='sku' label='کد SKU' placeholder='لطفا sku محصول را وارد کنید' />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField name='slug' label='اسلاگ' placeholder='لطفا اسلاگ محصول را وارد کنید' />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <FormField name='shortDescription' label='توضیحات کوتاه (اختیاری)' placeholder='توضیحات دسته‌بندی' type='richtext' />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormField name='description' label='توضیحات (اختیاری)' placeholder='توضیحات محصول' type='richtext' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation

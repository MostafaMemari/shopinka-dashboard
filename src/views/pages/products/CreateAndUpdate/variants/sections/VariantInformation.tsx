'use client'

import { type Control, type FieldErrors } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ProductVariantForm } from '@/types/app/productVariant.type'
import FormField from '@/components/form/FormField'

interface Props {
  control: Control<ProductVariantForm>
  errors: FieldErrors<ProductVariantForm>
}

const VariantInformation = ({ control, errors }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        اطلاعات متغیر
      </Typography>
      <Grid container spacing={6} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormField name='sku' label='کد SKE' control={control} errors={errors} placeholder='لطفا sku متغییر را وارد کنید' />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <FormField name='shortDescription' label='توضیحات کوتاه متغیر' control={control} errors={errors} placeholder='لطفا توضیحات کوتاه متغییر را وارد کنید' />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VariantInformation

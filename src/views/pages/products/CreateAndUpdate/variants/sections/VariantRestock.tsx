'use client'

import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CustomTextField from '@core/components/mui/TextField'
import { type ProductVariantForm } from '@/types/app/productVariant.type'
import FormField from '@/components/form/FormField'

interface Props {
  control: Control<ProductVariantForm>
  errors: FieldErrors<ProductVariantForm>
}

const VariantRestock = ({ control, errors }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        موجودی
      </Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormField control={control} errors={errors} name='quantity' label='تعداد' placeholder='لطفا تعداد را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormField control={control} errors={errors} name='weight' label='وزن (کیلوگرم)' placeholder='لطفا وزن را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormField control={control} errors={errors} name='width' label='عرض (سانتی‌متر)' placeholder='لطفا عرض را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormField control={control} errors={errors} name='height' label='ارتفاع (سانتی‌متر)' placeholder='لطفا ارتفاع را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormField control={control} errors={errors} name='length' label='طول (سانتی‌متر)' placeholder='لطفا طول را وارد کنید' />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VariantRestock

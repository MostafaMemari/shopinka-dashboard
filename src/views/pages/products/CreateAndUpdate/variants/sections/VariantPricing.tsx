'use client'

import { type Control, type FieldErrors } from 'react-hook-form'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { type ProductVariantForm } from '@/types/app/productVariant.type'
import Grid from '@mui/material/Grid2'
import FormField from '@/components/form/FormField'

interface Props {
  control: Control<ProductVariantForm>
  errors: FieldErrors<ProductVariantForm>
}

const VariantPricing = ({ control, errors }: Props) => {
  return (
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        قیمت‌گذاری
      </Typography>
      <Grid container spacing={6} className='mbe-6'>
        <Grid size={{ xs: 12 }}>
          <FormField name='basePrice' control={control} errors={errors} label='قیمت پایه' placeholder='لطفا قیمت پایه را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormField name='salePrice' control={control} errors={errors} label='قیمت با تخفیف' placeholder='لطفا قیمت تخفیف را وارد کنید' />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VariantPricing

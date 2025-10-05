'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

// Component Imports
import FormField from '@/components/form/FormField'

const ProductPricing = () => {
  return (
    <Card>
      <CardHeader title='قیمت‌گذاری' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid size={{ xs: 12 }}>
            <FormField name='basePrice' label='قیمت پایه' placeholder='لطفا قیمت پایه را وارد کنید' />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormField name='salePrice' label='قیمت با تخفیف' placeholder='لطفا قیمت تخفیف را وارد کنید' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductPricing

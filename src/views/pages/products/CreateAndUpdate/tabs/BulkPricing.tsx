'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

import FormField from '@/components/form/FormField'

const BulkPricing: React.FC = () => {
  return (
    <Card>
      <CardHeader title='فروش عمده' />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 3 }}>
            <FormField name='salePrice' label='قیمت با تخفیف' placeholder='لطفا قیمت تخفیف را وارد کنید' />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <FormField name='salePrice' label='قیمت با تخفیف' placeholder='لطفا قیمت تخفیف را وارد کنید' />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <FormField name='salePrice' label='قیمت با تخفیف' placeholder='لطفا قیمت تخفیف را وارد کنید' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BulkPricing

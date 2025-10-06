import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import FormField from '@/components/form/FormField'

const RestockTab: React.FC = () => {
  return (
    <TabPanel value='restock' className='flex flex-col gap-4'>
      <Typography className='font-medium'>موجودی</Typography>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormField name='quantity' label='تعداد' placeholder='لطفا تعداد را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormField name='weight' label='وزن (کیلوگرم)' placeholder='لطفا وزن را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormField name='width' label='عرض (سانتی‌متر)' placeholder='لطفا عرض را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormField name='height' label='ارتفاع (سانتی‌متر)' placeholder='لطفا ارتفاع را وارد کنید' />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormField name='length' label='طول (سانتی‌متر)' placeholder='لطفا طول را وارد کنید' />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default RestockTab

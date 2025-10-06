import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormField from '@/components/form/FormField'
import FormAutocompleteField from '@/components/form/FormAutocompleteField'

const SeoFormWithContext: React.FC = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Typography className='font-medium'>تنظیمات سئو</Typography>
      <Grid container spacing={6}>
        <FormField name='seo_title' label='عنوان سئو' placeholder='عنوان صفحه' />
        <FormField name='seo_description' label='توضیحات سئو' placeholder='توضیحات برای موتورهای جستجو' multiline rows={3} />
        <Grid size={{ xs: 12 }}>
          {/* <FormAutocompleteField name='seo_keywords' label='کلمات کلیدی سئو' placeholder='با Enter یا , اضافه کن' /> */}

          <FormField name='seo_keywords' label='کلمات کلیدی سئو' type='multiselect-autocomplete' />
        </Grid>
        <FormField name='seo_robotsTag' label='دستورات ربات‌ها' select defaultValue='index, follow'>
          <MenuItem value='index, follow'>Index, Follow</MenuItem>
          <MenuItem value='noindex, follow'>Noindex, Follow</MenuItem>
          <MenuItem value='index, nofollow'>Index, Nofollow</MenuItem>
          <MenuItem value='noindex, nofollow'>Noindex, Nofollow</MenuItem>
        </FormField>
      </Grid>
    </div>
  )
}

export default SeoFormWithContext

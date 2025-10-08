'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Hooks
import { useFormContext, Controller } from 'react-hook-form'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import FormField from '@/components/form/FormField'

const BlogInformation = () => {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Card>
      <CardHeader title='اطلاعات مقاله' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid size={{ xs: 12 }}>
            <FormField name='title' label='نام مقاله' placeholder='لطفا نام مقاله را وارد کنید' />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField name='slug' label='نامک' placeholder='new-tech-intro' />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField name='readingTime' label='زمان مطالعه (دقیقه)' placeholder='5' inputType='number' />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <FormField name='content' label='محتوای مقاله (اختیاری)' placeholder='محتوای مقاله را اینجا بنویسید' type='richtext' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BlogInformation

'use client'

import { Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import CustomTextField from '@core/components/mui/TextField'
import BannerThumbnailImage from './BannerThumbnailImage'
import { MenuItem, Switch, FormControlLabel } from '@mui/material'
import { Banner, BannerType } from '@/types/app/banner.type'

interface BannerFormProps {
  control: any
  errors: any
  setValue: any
  isLoading: boolean
  initialData?: Banner
}

const BannerForm = ({ control, errors, setValue, isLoading, initialData }: BannerFormProps) => {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <BannerThumbnailImage control={control} errors={errors} setValue={setValue} isLoading={isLoading} banner={initialData} />

          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name='type'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} select fullWidth label='جایگاه بنر' error={!!errors.type} helperText={errors.type?.message} disabled={isLoading}>
                    <MenuItem value={BannerType.MAIN_SLIDER}>اصلی</MenuItem>
                    <MenuItem value={BannerType.SIDE}>بغل</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name='link'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='لینک'
                    placeholder='لینک بنر را وارد کنید'
                    error={!!errors.link}
                    helperText={errors.link?.message}
                    disabled={isLoading}
                    aria-describedby='link-error'
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name='isActive'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value ?? true} onChange={e => field.onChange(e.target.checked)} disabled={isLoading} />}
                    label='فعال'
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default BannerForm

'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { Banner, BannerType } from '@/types/app/banner.type'
import { useBannerFormSubmit } from '@/hooks/reactQuery/banner/usePageFormSubmit'
import { useBannerFormFields } from '@/hooks/reactQuery/banner/useBannerFormFields'
import FormField from '@/components/form/FormField'
import Grid from '@mui/material/Grid2'
import { MenuItem } from '@mui/material'
import FormImagePicker from '@/components/form/FormImagePicker'

interface Props {
  trigger?: ReactNode
  banner?: Banner
}

const CreateUpdateBannerDialog = ({ banner, trigger }: Props) => {
  const isUpdate = !!banner

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { isPending, mutate } = useBannerFormSubmit({ initialData: banner })
  const { methods } = useBannerFormFields({ initialData: banner })

  const {
    control,
    reset,
    formState: { errors }
  } = methods

  const onSubmit = methods.handleSubmit(data =>
    mutate(data, {
      onSuccess: () => {
        reset(), setOpen(false)
      }
    })
  )

  const title = isUpdate ? 'بروزرسانی بنر' : 'ثبت بنر'
  const submitText = isUpdate ? 'بروزرسانی' : 'ثبت'

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()}>
        {trigger && (
          <div onClick={handleOpen} role='button' tabIndex={0}>
            {trigger}
          </div>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title={title}
        defaultMaxWidth='sm'
        actions={<FormActions onSubmit={onSubmit} onCancel={handleClose} isLoading={isPending} submitText={submitText} />}
      >
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <FormImagePicker name='imageId' control={control} mainImage={banner?.image} />

            <Grid container spacing={6}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField control={control} errors={errors} select name='type' label='جایگاه بنر' placeholder='لطفا جایگاه بنر را وارد کنید'>
                  <MenuItem value={BannerType.MAIN_SLIDER}>اصلی</MenuItem>
                  <MenuItem value={BannerType.SIDE}>بغل</MenuItem>
                </FormField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormField control={control} errors={errors} name='link' label='لینک' placeholder='لینک بنر را وارد کنید' />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormField control={control} errors={errors} type='switch' name='isActive' label='فعال' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CustomDialog>
    </div>
  )
}

export default CreateUpdateBannerDialog

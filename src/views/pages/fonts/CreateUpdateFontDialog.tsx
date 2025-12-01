'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { Font } from '@/types/app/font.type'
import FormField from '@/components/form/FormField'
import { useFontFormSubmit } from '@/hooks/reactQuery/font/useFontFormSubmit'
import { useFontFormFields } from '@/hooks/reactQuery/font/useFontFormFields'
import Grid from '@mui/material/Grid2'

interface CreateFontModalProps {
  font?: Font
  trigger?: ReactNode
}

const CreateUpdateFontDialog = ({ trigger, font }: CreateFontModalProps) => {
  const isUpdate = !!font

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { isPending, mutate } = useFontFormSubmit({ initialData: font })
  const { methods } = useFontFormFields({ initialData: font })

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

  const title = isUpdate ? 'بروزرسانی فونت' : 'بروزرسانی فونت'
  const submitText = isUpdate ? 'بروزرسانی' : 'ثبت'

  return (
    <div>
      {trigger && (
        <div onClick={handleOpen} role='button' tabIndex={0}>
          {trigger}
        </div>
      )}

      <CustomDialog
        open={open}
        onClose={handleClose}
        title={title}
        defaultMaxWidth='xs'
        actions={<FormActions formId='create-update-font' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} submitText={submitText} />}
      >
        <form onSubmit={onSubmit} id='create-update-font' className='flex flex-col gap-5'>
          <Grid container spacing={6} className='mbe-6'>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField control={control} errors={errors} name='name' label='نام فونت' placeholder='لطفا نام فونت را وارد کنید' />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField control={control} errors={errors} name='displayName' label='نام نمایشی فونت' placeholder='لطفا نام نمایشی فونت را وارد کنید' />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField control={control} errors={errors} inputType='number' name='lineHeight' label='ارتفاع خط' placeholder='لطفا ارتفاع خط را وارد کنید' />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField control={control} errors={errors} inputType='number' name='size' label='اندازه فونت' placeholder='لطفا اندازه فونت را وارد کنید' />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField control={control} errors={errors} type='switch' name='isPersian' label='فونت فارسی' />
            </Grid>
          </Grid>
        </form>
      </CustomDialog>
    </div>
  )
}

export default CreateUpdateFontDialog

'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { useMaterialStickerFormSubmit } from '@/hooks/reactQuery/material-sticker/useMaterialStickerFormSubmit'
import { useMaterialStickerFormFields } from '@/hooks/reactQuery/material-sticker/useMaterialStickerFormFields'
import FormField from '@/components/form/FormField'
import { MaterialSticker, SurfaceType } from '@/types/app/material-sticker.type'
import Grid from '@mui/material/Grid2'
import { MenuItem } from '@mui/material'

interface CreateMaterialStickerModalProps {
  materialSticker?: MaterialSticker
  trigger?: ReactNode
}

const CreateUpdateMaterialStickerDialog = ({ trigger, materialSticker }: CreateMaterialStickerModalProps) => {
  const isUpdate = !!materialSticker

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { isPending, mutate } = useMaterialStickerFormSubmit({ initialData: materialSticker })
  const { methods } = useMaterialStickerFormFields({ initialData: materialSticker })

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

  const title = isUpdate ? 'بروزرسانی متریال' : 'بروزرسانی متریال'
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
        actions={<FormActions formId='create-update-shipping' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} submitText={submitText} />}
      >
        <form onSubmit={onSubmit} id='create-update-shipping' className='flex flex-col gap-5'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField control={control} errors={errors} name='name' label='عنوان متریال' placeholder='لطفا عنوان متریال را وارد کنید' />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormField inputType='number' control={control} errors={errors} name='pricePerCM' label='قیمت به ازای هر سانتی‌ متر' placeholder='لطفا قیمت را وارد کنید' />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField inputType='number' control={control} errors={errors} name='profitPercent' label='درصد سود' placeholder='لطفا درصد سود را وارد کنید' />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField control={control} errors={errors} name='surface' label='جنس متریال' select placeholder='لطفا نوع دسته را انتخاب کنید'>
                <MenuItem value={SurfaceType.GLOSSY}>براق</MenuItem>
                <MenuItem value={SurfaceType.MATTE}>مات</MenuItem>
                <MenuItem value={SurfaceType.RAINBOW}>چندرنگ</MenuItem>
                <MenuItem value={SurfaceType.REFLECTIVE}>شب تاب</MenuItem>
              </FormField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormField type='color' control={control} name='colorCode' label='رنگ متریال' helperText={errors.colorCode?.message} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormField type='color-rgba' control={control} name='backgroundFrom' label='از رنگ' helperText={errors.backgroundFrom?.message} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormField type='color-rgba' control={control} name='backgroundTo' label='تا رنگ' helperText={errors.backgroundTo?.message} />
            </Grid>
          </Grid>
        </form>
      </CustomDialog>
    </div>
  )
}

export default CreateUpdateMaterialStickerDialog

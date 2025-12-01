'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { Font } from '@/types/app/font.type'
import FormField from '@/components/form/FormField'
import { useFontFormSubmit } from '@/hooks/reactQuery/font/useFontFormSubmit'
import { useFontFormFields } from '@/hooks/reactQuery/font/useFontFormFields'

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

  const title = isUpdate ? 'بروزرسانی حمل و نقل' : 'بروزرسانی حمل و نقل'
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
          <FormField control={control} errors={errors} name='name' label='روش حمل و نقل' placeholder='لطفا عنوان روش حمل را وارد کنید' />
          <FormField control={control} errors={errors} inputType='number' name='price' label='هزینه (تومان)' placeholder='لطفا هزینه حمل را وارد کنید' />
          <FormField control={control} errors={errors} inputType='number' name='estimatedDays' label='مدت زمان تخمینی (روز)' placeholder='لطفا مدت زمان تخمینی را وارد کنید' />

          <FormField control={control} errors={errors} type='switch' name='isActive' label='فعال' />
        </form>
      </CustomDialog>
    </div>
  )
}

export default CreateUpdateFontDialog

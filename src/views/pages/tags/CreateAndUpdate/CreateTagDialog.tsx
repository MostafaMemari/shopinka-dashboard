'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { useTagFormSubmit } from '@/hooks/reactQuery/tag/useTagFormSubmit'
import { useTagFormFields } from '@/hooks/reactQuery/tag/useTagFormFields'
import Grid from '@mui/material/Grid2'
import FormField from '@/components/form/FormField'
import { TagType } from '@/types/app/tag.type'

interface Props {
  trigger?: ReactNode
  type: TagType
}

const CreateTagDialog = ({ trigger, type }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { isPending, mutate } = useTagFormSubmit({})
  const { methods } = useTagFormFields({})

  const {
    control,
    reset,
    formState: { errors }
  } = methods

  const onSubmit = methods.handleSubmit(data =>
    mutate(
      { ...data, type },
      {
        onSuccess: () => {
          reset(), setOpen(false)
        }
      }
    )
  )

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
        title='ثبت برچسب جدید'
        defaultMaxWidth='xs'
        actions={<FormActions formId='create-tag' submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} />}
      >
        <form onSubmit={onSubmit} id='create-tag' className='flex flex-col gap-5'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={6}>
                <FormField control={control} errors={errors} name='name' label='عنوان تگ' placeholder='نام تگ را وارد کنید' />
                <FormField control={control} errors={errors} name='slug' label='نامک (Slug)' placeholder='نامک تگ را وارد کنید' />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CustomDialog>
    </div>
  )
}

export default CreateTagDialog

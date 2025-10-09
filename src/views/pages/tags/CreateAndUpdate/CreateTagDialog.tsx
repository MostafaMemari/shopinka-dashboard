'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { useTagFormSubmit } from '@/hooks/reactQuery/tag/useTagFormSubmit'
import { useTagFormFields } from '@/hooks/reactQuery/tag/useTagFormFields'

interface CreateTagModalProps {
  children?: ReactNode
}

const CreateTagModal = ({ children }: CreateTagModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { isPending, mutate } = useTagFormSubmit({})
  const { methods } = useTagFormFields({})

  const onSubmit = methods.handleSubmit(data =>
    mutate(data, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  )

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت برچسب جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت برچسب جدید'
        defaultMaxWidth='md'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} />}
      >
        {/* <TagForm control={methods.control} errors={methods.formState.errors} /> */}
      </CustomDialog>
    </div>
  )
}

export default CreateTagModal

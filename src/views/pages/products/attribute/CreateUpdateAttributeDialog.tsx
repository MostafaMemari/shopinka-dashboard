'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import AttributeForm from './AttributeForm'
import FormActions from '@/components/FormActions'
import { Attribute } from '@/types/app/productAttributes.type'
import { useAttributeFormFields } from '@/hooks/reactQuery/attributeValue/useAttributeFormFields'
import { useAttributeFormSubmit } from '@/hooks/reactQuery/attributeValue/useAttributeFormSubmit'

interface CreateUpdateAttributeDialogProps {
  attribute?: Attribute
  trigger?: ReactNode
}

const CreateUpdateAttributeDialog = ({ attribute, trigger }: CreateUpdateAttributeDialogProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const isUpdate = !!attribute

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const methods = useAttributeFormFields({ initialData: attribute })

  const { isPending, mutate } = useAttributeFormSubmit({
    initialData: attribute,
    onSuccess: () => {
      handleClose()
    }
  })

  const onSubmit = methods.handleSubmit(data => mutate(data))

  const title = isUpdate ? 'بروزرسانی ویژدگی' : 'ثبت ویژگی'
  const submitText = isUpdate ? 'بروزرسانی' : 'ثبت'

  return (
    <>
      {trigger && (
        <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()} aria-label='باز کردن فرم ویرایش ویژگی'>
          {trigger}
        </div>
      )}

      <CustomDialog
        open={open}
        onClose={handleClose}
        title={title}
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleClose} submitText={submitText} onSubmit={onSubmit} isLoading={isPending} />}
      >
        <AttributeForm control={methods.control} errors={methods.formState.errors} onSubmit={onSubmit} />
      </CustomDialog>
    </>
  )
}

export default CreateUpdateAttributeDialog

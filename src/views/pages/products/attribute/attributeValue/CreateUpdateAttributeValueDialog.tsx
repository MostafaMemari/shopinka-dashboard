'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { Attribute, AttributeValue } from '@/types/app/productAttributes.type'
import { useAttributeValueFormFields } from '@/hooks/reactQuery/attributeValue/useAttributeValueFormFields'
import { useAttributeValueFormSubmit } from '@/hooks/reactQuery/attributeValue/useAttributeValueFormSubmit'
import AttributeValueForm from './AttributeValueForm'

interface Props {
  trigger?: ReactNode
  attributeValue?: AttributeValue
  attribute: Attribute
}

const CreateUpdateAttributeValueDialog = ({ attributeValue, attribute, trigger }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const isUpdate = !!attributeValue

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const methods = useAttributeValueFormFields({ initialData: attributeValue, attributeId: String(attribute.id) })

  const {
    control,
    reset,
    formState: { errors }
  } = methods

  const { isPending, mutate } = useAttributeValueFormSubmit({
    initialData: attributeValue,
    onSuccess: () => {
      reset()
      handleClose()
    }
  })

  const onSubmit = methods.handleSubmit(data => mutate(data))

  const title = isUpdate ? 'بروزرسانی متغیر' : 'ثبت متغیر'
  const submitText = isUpdate ? 'بروزرسانی' : 'ثبت'

  return (
    <>
      {trigger && (
        <div onClick={handleOpen} role='button' tabIndex={0}>
          {trigger}
        </div>
      )}

      <CustomDialog
        open={open}
        onClose={handleClose}
        title={`${title} - ${attribute.name}`}
        defaultMaxWidth='xs'
        actions={<FormActions formId='create-update-attribute-value' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} submitText={submitText} />}
      >
        <AttributeValueForm control={control} errors={errors} onSubmit={onSubmit} attributeType={attribute.type} />
      </CustomDialog>
    </>
  )
}

export default CreateUpdateAttributeValueDialog

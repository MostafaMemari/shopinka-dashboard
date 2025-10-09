'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import AttributeValueForm from './AttributeValueForm'
import FormActions from '@/components/FormActions'
import { Attribute, AttributeValue } from '@/types/app/productAttributes.type'
import { useAttributeValueFormFields } from '@/hooks/reactQuery/attributeValue/useAttributeValueFormFields'
import { useAttributeValueFormSubmit } from '@/hooks/reactQuery/attributeValue/useAttributeValueFormSubmit'

interface Props {
  trigger?: ReactNode
  attributeValue?: AttributeValue
  attribute: Attribute
}

const CreateUpdateAttributeValueDialog = ({ attributeValue, attribute, trigger }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const methods = useAttributeValueFormFields({ initialData: attributeValue, attributeId: String(attribute.id) })

  const {
    control,
    formState: { errors }
  } = methods

  const { isPending, mutate } = useAttributeValueFormSubmit({
    initialData: attributeValue,
    onSuccess: () => {
      handleClose()
    }
  })

  const onSubmit = methods.handleSubmit(data => mutate(data))

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
        title={`ثبت متغیر ویژگی برای ${attribute.name}`}
        defaultMaxWidth='xs'
        actions={<FormActions onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} />}
      >
        <AttributeValueForm control={control} errors={errors} attributeType={attribute.type} />
      </CustomDialog>
    </>
  )
}

export default CreateUpdateAttributeValueDialog

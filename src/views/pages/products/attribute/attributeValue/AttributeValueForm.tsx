'use client'

import { type Control, type FieldErrors } from 'react-hook-form'

import { AttributeType, AttributeValueFormType } from '@/types/app/productAttributes.type'
import FormField from '@/components/form/FormField'

interface AttributeValueFormProps {
  control: Control<AttributeValueFormType>
  errors: FieldErrors<AttributeValueFormType>
  attributeType: AttributeType
  onSubmit?: () => void
}

const AttributeValueForm = ({ control, errors, attributeType, onSubmit }: AttributeValueFormProps) => {
  return (
    <form onSubmit={onSubmit} id='create-update-attribute-value' className='flex flex-col gap-5'>
      <FormField control={control} errors={errors} name='name' label='نام ویژگی' />

      <FormField control={control} errors={errors} name='slug' label='نامک' />

      {attributeType === AttributeType.BUTTON ? (
        <FormField control={control} errors={errors} name='buttonLabel' label='دکمه' />
      ) : (
        <FormField type='color' control={control} name='colorCode' label='انتخاب رنگ' helperText={errors.colorCode?.message} />
      )}
    </form>
  )
}

export default AttributeValueForm

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
      <FormField control={control} name='name' label='نام ویژگی' helperText={errors.name?.message} />

      <FormField control={control} name='slug' label='نامک' helperText={errors.slug?.message} />

      {attributeType === AttributeType.BUTTON ? (
        <FormField control={control} name='buttonLabel' label='دکمه' helperText={errors.buttonLabel?.message} />
      ) : (
        <FormField type='color' control={control} name='colorCode' label='انتخاب رنگ' helperText={errors.colorCode?.message} />
      )}
    </form>
  )
}

export default AttributeValueForm

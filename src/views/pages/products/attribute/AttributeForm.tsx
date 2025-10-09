'use client'

import { type Control, type FieldErrors } from 'react-hook-form'
import { MenuItem } from '@mui/material'
import { AttributeFormType, AttributeType } from '@/types/app/productAttributes.type'
import FormField from '@/components/form/FormField'

interface Props {
  control: Control<AttributeFormType>
  errors: FieldErrors<AttributeFormType>
  onSubmit?: () => void
}

const AttributeForm = ({ control, errors, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} id='create-update-attribute-form' className='flex flex-col gap-5'>
      <FormField control={control} errors={errors} name='name' label='نام ویژگی' placeholder='لطفا نام ویژگی را وارد کنید' />

      <FormField control={control} errors={errors} name='slug' label='نامک' placeholder='لطفا نامک ویژگی را وارد کنید' />

      <FormField control={control} errors={errors} name='type' label='نوع' select placeholder='لطفا نوع ویژگی را انتخاب کنید'>
        <MenuItem value={AttributeType.COLOR}>رنگ</MenuItem>
        <MenuItem value={AttributeType.BUTTON}>دکمه</MenuItem>
      </FormField>

      <FormField control={control} errors={errors} name='description' label='توضیحات' placeholder='لطفا توضیحات ویژگی را وارد کنید' rows={4} />
    </form>
  )
}

export default AttributeForm

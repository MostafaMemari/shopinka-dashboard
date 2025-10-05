import { Controller, useFormContext } from 'react-hook-form'
import RichTextEditor from '../RichTextEditor/RichTextEditor'

type RichTextFormFieldProps = {
  name: string
  label: string
  placeholder?: string
  defaultValue?: string
}

const RichTextFormField: React.FC<RichTextFormFieldProps> = ({ name, label, placeholder, defaultValue }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => <RichTextEditor label={label} placeholder={placeholder} value={field.value || ''} onChange={field.onChange} />}
    />
  )
}

export default RichTextFormField

import { Controller, useFormContext } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import RichTextEditor from '../RichTextEditor/RichTextEditor'

type FormFieldProps = {
  name: string
  label: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  select?: boolean
  children?: React.ReactNode
  defaultValue?: any
  type?: 'text' | 'richtext'
}

const FormField: React.FC<FormFieldProps> = ({ name, label, placeholder, multiline, rows, select, children, defaultValue, type = 'text' }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) =>
        type === 'richtext' ? (
          <RichTextEditor label={label} placeholder={placeholder} value={field.value || ''} onChange={field.onChange} />
        ) : (
          <CustomTextField
            {...field}
            value={field.value ?? ''}
            fullWidth
            multiline={multiline}
            rows={rows}
            select={select}
            label={label}
            placeholder={placeholder}
            error={!!errors[name]}
            helperText={errors[name]?.message?.toString()}
          >
            {children}
          </CustomTextField>
        )
      }
    />
  )
}

export default FormField

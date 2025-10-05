import { Controller, useFormContext } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'

type TextFormFieldProps = {
  name: string
  label: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  select?: boolean
  children?: React.ReactNode
  defaultValue?: any
  helperText?: string
}

const TextFormField: React.FC<TextFormFieldProps> = ({ name, label, placeholder, multiline, rows, select, children, defaultValue, helperText }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
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
          helperText={errors[name]?.message?.toString() || helperText}
        >
          {children}
        </CustomTextField>
      )}
    />
  )
}

export default TextFormField

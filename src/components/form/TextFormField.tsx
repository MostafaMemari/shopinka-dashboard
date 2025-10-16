import { Controller, useFormContext } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'

type TextFormFieldProps = {
  name: string
  label: string
  inputType?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  select?: boolean
  children?: React.ReactNode
  defaultValue?: any
  helperText?: string
  control?: any
  errors?: Record<string, any>
  disabled?: boolean
}

const TextFormField: React.FC<TextFormFieldProps> = ({
  name,
  label,
  inputType = 'text',
  placeholder,
  multiline,
  rows,
  select,
  children,
  defaultValue,
  helperText,
  control: externalControl,
  errors: externalErrors,
  disabled = false
}) => {
  const context = useFormContext()

  const control = externalControl ?? context?.control
  const errors = externalErrors ?? context?.formState?.errors ?? {}

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <CustomTextField
          {...field}
          value={field.value ?? ''}
          type={inputType}
          fullWidth
          multiline={multiline}
          rows={rows}
          select={select}
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message?.toString() || helperText}
        >
          {children}
        </CustomTextField>
      )}
    />
  )
}

export default TextFormField

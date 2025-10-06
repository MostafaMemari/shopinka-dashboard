import { Controller, useFormContext } from 'react-hook-form'
import Autocomplete from '@mui/material/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'

type Option = {
  label: string
  value: string | number
}

type MultiSelectFormFieldProps = {
  name: string
  label: string
  options: Option[]
  placeholder?: string
  helperText?: string
  defaultValue?: (string | number)[]
  control?: any
  errors?: Record<string, any>
}

const MultiSelectFormField: React.FC<MultiSelectFormFieldProps> = ({
  name,
  label,
  options,
  placeholder,
  helperText,
  defaultValue = [],
  control: externalControl,
  errors: externalErrors
}) => {
  const context = useFormContext()

  const control = externalControl ?? context?.control
  const errors = externalErrors ?? context?.formState?.errors ?? {}

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const defaultSelectedOptions = options.filter(opt => defaultValue.includes(opt.value))
        const currentValue = options.filter(opt => (field.value || []).includes(opt.value))

        return (
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={option => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            defaultValue={defaultSelectedOptions}
            value={currentValue}
            onChange={(_, newValues) => field.onChange(newValues.map(v => v.value))}
            renderInput={params => (
              <CustomTextField {...params} label={label} placeholder={placeholder} error={!!errors?.[name]} helperText={errors?.[name]?.message?.toString() || helperText} />
            )}
          />
        )
      }}
    />
  )
}

export default MultiSelectFormField

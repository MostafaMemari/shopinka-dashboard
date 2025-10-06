import { Controller, useFormContext } from 'react-hook-form'
import { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

type MultiSelectAutocompleteFormFieldProps = {
  name: string
  label: string
  placeholder?: string
  options?: string[]
  defaultValue?: string[]
  control?: any
  setValue?: (name: string, value: any, options?: any) => void
  errors?: Record<string, any>
}

const MultiSelectAutocompleteFormField: React.FC<MultiSelectAutocompleteFormFieldProps> = ({
  name,
  label,
  placeholder,
  options = [],
  defaultValue = [],
  control: externalControl,
  setValue: externalSetValue,
  errors: externalErrors
}) => {
  const context = useFormContext()

  const control = externalControl ?? context?.control
  const setValue = externalSetValue ?? context?.setValue
  const errors = externalErrors ?? context?.formState?.errors ?? {}

  const [inputValue, setInputValue] = useState('')

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple
          freeSolo
          options={options}
          value={field.value || []}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          onChange={(_, newValue) => {
            const uniqueValues = Array.from(
              new Set((newValue ?? []).map(v => (typeof v === 'string' ? v.trim() : (v as any).value)).filter(v => typeof v === 'string' && v.length > 0))
            )

            const finalValues = uniqueValues.length > 0 ? uniqueValues : []

            setValue?.(name, finalValues, { shouldValidate: true })
            field.onChange(finalValues)
          }}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!(fieldState.error || errors?.[name])}
              helperText={fieldState.error?.message || errors?.[name]?.message}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
                  e.preventDefault()
                  const newKeyword = inputValue.trim()

                  if (!field.value.includes(newKeyword)) {
                    const updated = [...(field.value || []), newKeyword]

                    setValue?.(name, updated, { shouldValidate: true })
                    field.onChange(updated)
                  }

                  setInputValue('')
                }
              }}
            />
          )}
        />
      )}
    />
  )
}

export default MultiSelectAutocompleteFormField

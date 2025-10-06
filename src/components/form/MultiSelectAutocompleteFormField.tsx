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
}

const MultiSelectAutocompleteFormField: React.FC<MultiSelectAutocompleteFormFieldProps> = ({ name, label, placeholder, options = [], defaultValue = [] }) => {
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext()

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
            const uniqueValues = Array.from(new Set((newValue ?? []).map(v => (typeof v === 'string' ? v.trim() : v.value)).filter(v => v.length > 0)))

            const finalValues = uniqueValues.length > 0 ? uniqueValues : []

            setValue(name, finalValues, { shouldValidate: true })
            field.onChange(finalValues)
          }}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
                  e.preventDefault()
                  const newKeyword = inputValue.trim()

                  if (!field.value.includes(newKeyword)) {
                    const updated = [...(field.value || []), newKeyword]

                    setValue(name, updated, { shouldValidate: true })
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

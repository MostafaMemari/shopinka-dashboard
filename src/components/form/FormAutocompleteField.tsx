import { Controller, useFormContext } from 'react-hook-form'
import { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

type FormAutocompleteFieldProps = {
  name: string
  label: string
  placeholder?: string
  options?: string[]
}

const FormAutocompleteField: React.FC<FormAutocompleteFieldProps> = ({ name, label, placeholder, options = [] }) => {
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
      defaultValue={[]}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple
          freeSolo
          options={options}
          value={field.value || []}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
          }}
          onChange={(_, newValue) => {
            const uniqueValues = Array.from(new Set((newValue ?? []).map(v => v.trim()).filter(v => v.length > 0)))

            setValue(name, uniqueValues, { shouldValidate: true })
            field.onChange(uniqueValues)
          }}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              error={!!fieldState.error}
              helperText={fieldState.error?.message?.toString()}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
                  e.preventDefault()
                  const newKeyword = inputValue.trim()

                  if (Array.isArray(field.value) && !field.value.includes(newKeyword)) {
                    const updated = [...field.value, newKeyword]

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

export default FormAutocompleteField

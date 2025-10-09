'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { FormControlLabel, Switch } from '@mui/material'

type SwitchFormFieldProps = {
  name: string
  label: string
  defaultValue?: boolean
  control?: any
  disabled?: boolean
  errors?: Record<string, any>
}

const SwitchFormField: React.FC<SwitchFormFieldProps> = ({ name, label, defaultValue = false, control: externalControl, disabled = false, errors: externalErrors }) => {
  const context = useFormContext()

  const control = externalControl ?? context?.control

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControlLabel control={<Switch checked={!!field.value} onChange={e => field.onChange(e.target.checked)} disabled={disabled} />} label={label} sx={{ margin: 0 }} />
      )}
    />
  )
}

export default SwitchFormField

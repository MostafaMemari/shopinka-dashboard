import { Controller, useFormContext } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import Grid from '@mui/material/Grid2'

type FormFieldProps = {
  name: string
  label: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  select?: boolean
  children?: React.ReactNode
  defaultValue?: any
  size?: { xs?: number; sm?: number; md?: number; lg?: number }
}

const FormField: React.FC<FormFieldProps> = ({ name, label, placeholder, multiline, rows, select, children, defaultValue, size = { xs: 12 } }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Grid size={size}>
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
            helperText={errors[name]?.message?.toString()}
          >
            {children}
          </CustomTextField>
        )}
      />
    </Grid>
  )
}

export default FormField

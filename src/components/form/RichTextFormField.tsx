import { Controller, useFormContext } from 'react-hook-form'
import RichTextEditor from '../RichTextEditor/RichTextEditor'

type RichTextFormFieldProps = {
  name: string
  label: string
  placeholder?: string
  defaultValue?: string
  control?: any
  errors?: Record<string, any>
  helperText?: string
}

const RichTextFormField: React.FC<RichTextFormFieldProps> = ({ name, label, placeholder, defaultValue, control: externalControl, errors: externalErrors, helperText }) => {
  const context = useFormContext()

  const control = externalControl ?? context?.control
  const errors = externalErrors ?? context?.formState?.errors ?? {}

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <div>
          <RichTextEditor label={label} placeholder={placeholder} value={field.value || ''} onChange={field.onChange} />
          {(errors?.[name]?.message || helperText) && (
            <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors?.[name]?.message?.toString() || helperText}</p>
          )}
        </div>
      )}
    />
  )
}

export default RichTextFormField

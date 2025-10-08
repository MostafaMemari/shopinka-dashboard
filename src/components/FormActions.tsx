import { Button, CircularProgress } from '@mui/material'

interface FormActionsProps {
  onCancel: () => void
  onSubmit?: () => void
  isLoading?: boolean
  cancelText?: string
  submitText?: string
  submitColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  disabled?: boolean
  formId?: string
}

const FormActions = ({ onCancel, onSubmit, isLoading = false, cancelText = 'انصراف', submitText = 'ثبت', submitColor = 'primary', disabled = false, formId }: FormActionsProps) => {
  return (
    <>
      <Button onClick={onCancel} color='secondary'>
        {cancelText}
      </Button>

      <Button type='submit' form={formId} onClick={!formId ? onSubmit : undefined} variant='contained' color={submitColor} disabled={isLoading || disabled}>
        {isLoading ? <CircularProgress size={20} color='inherit' /> : submitText}
      </Button>
    </>
  )
}

export default FormActions

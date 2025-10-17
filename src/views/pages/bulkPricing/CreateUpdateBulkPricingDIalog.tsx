'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import FormField from '@/components/form/FormField'
import { MenuItem } from '@mui/material'
import { useBulkPricingFormSubmit } from '@/hooks/reactQuery/bulk-pricing/useBulkPricingFormSubmit'
import { BulkPricingItem } from '@/types/app/bulkPricing.type'
import { useBulkPricingFormFields } from '@/hooks/reactQuery/bulk-pricing/useBulkPricingFormFields'

interface Props {
  bulkPricing?: BulkPricingItem
  trigger?: ReactNode
}

const CreateUpdateBulkPricingDIalog = ({ bulkPricing, trigger }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { methods } = useBulkPricingFormFields({ initialData: bulkPricing })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods

  const { isPending, mutate } = useBulkPricingFormSubmit({
    initialData: bulkPricing,
    onSuccess: () => {
      handleClose()
    }
  })

  const onSubmit = handleSubmit(data => mutate({ ...data, isGlobal: true }))

  return (
    <div>
      <div onClick={handleOpen}>{trigger}</div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت گالری جدید'
        defaultMaxWidth='xs'
        actions={<FormActions formId='gallery-form' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} />}
      >
        <form onSubmit={onSubmit} id='gallery-form' className='flex flex-col gap-5'>
          <FormField name='minQty' control={control} errors={errors} inputType='number' label='حداقل تعداد' placeholder='لطفا حداقل تعداد را وارد کنید' />
          <FormField name='discount' control={control} errors={errors} inputType='number' label='مقدار تخفیف' placeholder='لطفا حداقل مقدار را وارد کنید' />

          <FormField control={control} errors={errors} defaultValue={'PERCENT'} name='type' select label='نوع قیمت'>
            <MenuItem value='PERCENT'>درصدی</MenuItem>
            <MenuItem value='FIXED'>ثابت</MenuItem>
          </FormField>
        </form>
      </CustomDialog>
    </div>
  )
}

export default CreateUpdateBulkPricingDIalog

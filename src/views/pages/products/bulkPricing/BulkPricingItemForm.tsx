'use client'

import { useState } from 'react'
import { Button, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'
import FormField from '@/components/form/FormField'
import { useBulkPricingFormSubmit } from '@/hooks/reactQuery/bulk-pricing/useBulkPricingFormSubmit'
import { useBulkPricingFormFields } from '@/hooks/reactQuery/bulk-pricing/useBulkPricingFormFields'
import { BulkPricingItem } from '@/types/app/bulkPricing.type'
import RemoveBulkPricingDialog from './RemoveBulkPricing'

interface BulkPricingItemFormProps {
  item: BulkPricingItem
  productId?: number | null
  variantId?: number | null
  onDelete: () => void
}

const BulkPricingItemForm = ({ item, productId, variantId, onDelete }: BulkPricingItemFormProps) => {
  const [editable, setEditable] = useState(!item.id)
  const { mutate, isPending } = useBulkPricingFormSubmit({ initialData: item, isUpdate: !!item.id })
  const { methods } = useBulkPricingFormFields({ initialData: item })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods

  const handleToggleEdit = handleSubmit(values => {
    if (editable) {
      mutate({
        ...values,
        productId: productId ?? null,
        variantId: variantId ?? null,
        minQty: values.minQty,
        type: values.type,
        isGlobal: values.isGlobal ?? false
      })

      setEditable(false)
    } else {
      setEditable(true)
    }
  })

  return (
    <form>
      <Grid container spacing={2} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Grid size={{ xs: 12, sm: 2 }}>
          <FormField control={control} errors={errors} name='minQty' label='حداقل تعداد' placeholder='مثلاً 5' disabled={!editable} />
        </Grid>

        <Grid size={{ xs: 12, sm: 2 }}>
          <FormField control={control} errors={errors} name='discount' label='مقدار تخفیف' placeholder='مثلاً 10' disabled={!editable} />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <FormField control={control} errors={errors} name='type' select label='نوع قیمت' disabled={!editable}>
            <MenuItem value='PERCENT'>درصدی</MenuItem>
            <MenuItem value='FIXED'>ثابت</MenuItem>
          </FormField>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }} marginTop={{ xs: 0, sm: 4 }} display='flex' alignItems='center' justifyContent='flex-end' gap={2}>
          <Button sx={{ width: 100 }} variant='tonal' color={editable ? 'success' : 'primary'} onClick={handleToggleEdit} disabled={isPending}>
            {editable ? 'ثبت' : 'ویرایش'}
          </Button>

          {item.id ? (
            <RemoveBulkPricingDialog id={item.id}>
              <Button sx={{ width: 80 }} variant='outlined' color='error'>
                حذف
              </Button>
            </RemoveBulkPricingDialog>
          ) : (
            <Button sx={{ width: 80 }} variant='outlined' color='error' onClick={onDelete}>
              حذف
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default BulkPricingItemForm

'use client'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SaveIcon from '@mui/icons-material/Save'
import VariantInformation from './sections/VariantInformation'
import VariantRestock from './sections/VariantRestock'
import VariantPricing from './sections/VariantPricing'
import VariantImage from './sections/VariantImage'
import RemoveProductVariantModal from './RemoveProductVariantModal'
import { ProductVariant } from '@/types/app/productVariant.type'
import { useProductVariantFormSubmit } from '@/hooks/reactQuery/productVariant/useProductVariantFormSubmit'
import { useDefaultVariant } from '@/hooks/reactQuery/useDefaultVariant'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import { useProductVariantFormFields } from '@/hooks/reactQuery/productVariant/useProductVariantFormFields'
import { useEffect, useState } from 'react'
import { useProductContext } from '../ProductContext'
import { Button } from '@mui/material'

type VariantAccordionProps = {
  variant: ProductVariant
  expanded: boolean
  onChange: (id: string) => void
}

const VariantAccordion = ({ variant, expanded, onChange }: VariantAccordionProps) => {
  const { isLoading, onSubmit } = useProductVariantFormSubmit({ productId: Number(variant.productId), initialData: variant })
  const { product } = useProductContext()

  const [isDefault, setIsDefault] = useState(variant.id === product?.defaultVariantId)

  useEffect(() => {
    setIsDefault(variant.id === product?.defaultVariantId)
  }, [variant.id, product?.defaultVariantId])

  const { toggleDefaultVariant, isLoading: isSettingDefault } = useDefaultVariant({
    productId: Number(variant.productId),
    variantId: Number(variant.id)
  })

  const { methods } = useProductVariantFormFields({ initialData: variant })

  useEffect(() => {
    if (variant) {
      methods.reset({ ...variant, attributeValueIds: variant?.attributeValues?.map(att => att.id) ?? [] } as any)
    }
  }, [variant, methods])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = methods

  const handleUpdateProductVariant = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <Accordion expanded={expanded} onChange={() => onChange(String(variant.id ?? ''))} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
      <AccordionSummary expandIcon={<i className='tabler-chevron-down' />} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
          {/* سمت راست */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RemoveProductVariantModal id={Number(variant.id)}>
              <Tooltip title='حذف متغیر'>
                <IconButton size='small' color='error'>
                  <DeleteOutlineIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </RemoveProductVariantModal>

            <Tooltip title={isDefault ? 'حذف از پیش‌فرض' : 'تنظیم به‌عنوان پیش‌فرض'}>
              <IconButton
                size='small'
                color={isDefault ? 'warning' : 'default'}
                onClick={() => toggleDefaultVariant(isDefault ?? false)}
                disabled={isSettingDefault}
                sx={{ mr: 2 }}
              >
                {isDefault ? <StarIcon fontSize='small' /> : <StarBorderIcon fontSize='small' />}
              </IconButton>
            </Tooltip>

            <Typography>{(variant.attributeValues ?? []).map(av => av.name).join(', ') || 'متغیر جدید'}</Typography>
          </Box>

          <Button variant='outlined' color='primary' size='small' onClick={handleUpdateProductVariant} disabled={isLoading}>
            ثبت تغییرات
          </Button>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <VariantInformation control={control} errors={errors} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <VariantRestock control={control} errors={errors} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <VariantPricing control={control} errors={errors} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <VariantImage mainImage={variant.mainImage} setValue={setValue} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default VariantAccordion

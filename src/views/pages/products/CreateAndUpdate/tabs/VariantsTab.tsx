'use client'

import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import { AttributeValue } from '@/types/app/productAttributes.type'
import FormField from '@/components/form/FormField'
import { useProductContext } from '../ProductContext'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import CreateUpdateAttributeDialog from '../../attribute/CreateUpdateAttributeDialog'
import { useProductVariants } from '@/hooks/reactQuery/productVariant/useProductVariants'
import { useAttribute } from '@/hooks/reactQuery/attribute/useAttribute'

const VariantsTab = () => {
  const { product } = useProductContext()
  const { watch } = useFormContext()

  const attributeIds = useMemo(() => {
    return product?.attributes?.map(att => att.id) ?? []
  }, [product])

  const formType = watch('type')

  const { data, isLoading, error } = useAttribute({})

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h6' sx={{ fontWeight: 'medium', mb: 2 }}>
          انواع محصول
        </Typography>

        <FormField name='type' label='نوع محصول' select defaultValue='index, follow'>
          <MenuItem value='SIMPLE'>ساده</MenuItem>
          <MenuItem value='VARIABLE'>متغیر</MenuItem>
        </FormField>
      </Grid>
      {formType === 'VARIABLE' && (
        <Grid size={{ xs: 12 }}>
          {isLoading ? (
            <Typography color='text.secondary'>در حال بارگذاری...</Typography>
          ) : error ? (
            <Typography color='error'>خطا در بارگذاری ویژگی‌ها</Typography>
          ) : (
            <FormField
              type='multiselect'
              name='attributeIds'
              label='انتخاب ویژگی'
              placeholder='ویژگی‌ها را انتخاب کنید'
              defaultValue={attributeIds}
              options={
                data?.data?.items.map((att: AttributeValue) => ({
                  label: att.name,
                  value: att.id
                })) || []
              }
            />
          )}
        </Grid>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <CreateUpdateAttributeDialog
          trigger={
            <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              ثبت ویژگی جدید
            </Typography>
          }
        />
      </Box>
    </Grid>
  )
}

export default VariantsTab

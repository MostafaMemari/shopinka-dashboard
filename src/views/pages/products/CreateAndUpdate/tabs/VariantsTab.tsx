'use client'

import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import useVariants from '@/hooks/useVariants'
import { AttributeValue } from '@/types/app/productAttributes.type'
import CreateAttributeModal from '../../attribute/CreateAttributeModal'
import FormField from '@/components/form/FormField'
import { useProductContext } from '../ProductContext'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

const VariantsTab = () => {
  const { product } = useProductContext()
  const { watch } = useFormContext()

  const attributeIds = useMemo(() => {
    return product?.attributes?.map(att => att.id) ?? []
  }, [product])

  const formType = watch('type')

  const { attributesData, isLoadingAttributes, isFetchingAttributes, errorAttributes } = useVariants(formType, attributeIds)

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
          {isLoadingAttributes || isFetchingAttributes ? (
            <Typography color='text.secondary'>در حال بارگذاری...</Typography>
          ) : errorAttributes ? (
            <Typography color='error'>خطا در بارگذاری ویژگی‌ها</Typography>
          ) : (
            <FormField
              type='multiselect'
              name='attributeIds'
              label='انتخاب ویژگی'
              defaultValue={attributeIds}
              options={
                attributesData?.data?.items.map((att: AttributeValue) => ({
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
        <CreateAttributeModal>
          <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            ثبت ویژگی جدید
          </Typography>
        </CreateAttributeModal>
      </Box>
    </Grid>
  )
}

export default VariantsTab

// <Controller
//   name='attributeIds'
//   control={control}
//   render={({ field, fieldState }) => (
//     <Autocomplete
//       multiple
//       options={attributesData?.data?.items?.map((attr: Attribute) => attr.id) || []}
//       defaultValue={[attributesData?.data?.items[0]]}
//       getOptionLabel={option => attributesData?.data?.items?.find((attr: Attribute) => attr.id === option)?.name || ''}
//       value={field.value || []}
//       onChange={(_, newValue) => {
//         const uniqueValues = Array.from(new Set(newValue))

//         field.onChange(uniqueValues)
//       }}
//       renderInput={params => (
//         <CustomTextField
//           {...params}
//           label='ویژگی‌ها'
//           placeholder='ویژگی‌ها را انتخاب کنید'
//           error={!!fieldState.error}
//           helperText={fieldState.error?.message || 'انتخاب ویژگی‌ها اختیاری است'}
//         />
//       )}
//       renderOption={(props, option) => {
//         const attr = attributesData?.data?.items?.find((attr: Attribute) => attr.id === option)

//         return (
//           <li {...props} key={option}>
//             {attr?.name}
//           </li>
//         )
//       }}
//       noOptionsText='هیچ ویژگی‌ای یافت نشد'
//     />
//   )}
// />

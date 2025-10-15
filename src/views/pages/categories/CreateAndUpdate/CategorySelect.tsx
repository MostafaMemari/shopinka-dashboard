import React, { useMemo, useCallback } from 'react'
import { MenuItem, CircularProgress, Box } from '@mui/material'
import FormField from '@/components/form/FormField'
import { Category } from '@/types/app/category.type'

interface CategorySelectProps {
  control: any
  errors: any
  categories: Category[]
  isLoading?: boolean
}

export default function CategorySelect({ control, errors, categories, isLoading }: CategorySelectProps) {
  const renderCategoryOptions = useCallback((items: Category[] = [], level = 0): JSX.Element[] => {
    if (!Array.isArray(items)) return []

    return items.flatMap(category => {
      const current = (
        <MenuItem key={category.id} value={category.id}>
          {'— '.repeat(level)}
          {category.name} ({category.type === 'PRODUCT' ? 'محصول' : 'بلاگ'})
        </MenuItem>
      )

      const children = Array.isArray(category.children) ? renderCategoryOptions(category.children, level + 1) : []

      return [current, ...children]
    })
  }, [])

  const allOptions = useMemo(() => renderCategoryOptions(categories), [categories, renderCategoryOptions])

  return (
    <FormField control={control} errors={errors} name='parentId' label='دسته والد' select placeholder='لطفا دسته والد را انتخاب کنید'>
      {isLoading ? (
        <Box display='flex' alignItems='center' justifyContent='center' py={2}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        [
          <MenuItem key='' value=''>
            بدون دسته والد
          </MenuItem>,
          ...allOptions
        ]
      )}
    </FormField>
  )
}

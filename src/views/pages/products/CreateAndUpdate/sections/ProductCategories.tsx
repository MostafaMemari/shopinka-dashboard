'use client'

// React Imports
import { useMemo, useState, useCallback } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { useCategories } from '@/hooks/reactQuery/useCategory'
import { Category, CategoryType } from '@/types/app/category.type'
import { useFormContext, Controller } from 'react-hook-form'
import CreateCategoryDialog from '@/views/pages/categories/CreateCategoryDialog'

const ProductCategories = ({ initialCategoryIds }: { initialCategoryIds: number[] }) => {
  const { control } = useFormContext()

  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isFetching, error } = useCategories({
    enabled: true,
    params: { take: 200, includeThumbnailImage: true, includeChildren: true, type: 'PRODUCT', childrenDepth: 6 },
    staleTime: 5 * 60 * 1000
  })

  const categories: Category[] = useMemo(() => {
    return (data?.data?.items || []).filter((category: Category) => category.parentId === null || category.parentId === undefined)
  }, [data])

  const filterCategories = useCallback((categories: Category[], query: string): Category[] => {
    if (!query.trim()) return categories

    return categories
      .map(category => {
        const filteredChildren = filterCategories(category.children || [], query)
        const matches = category.name.toLowerCase().includes(query.toLowerCase().trim())

        if (matches || filteredChildren.length > 0) {
          return { ...category, children: filteredChildren }
        }

        return null
      })
      .filter((c): c is Category => c !== null)
  }, [])

  const filteredCategories = useMemo(() => filterCategories(categories, searchQuery), [categories, searchQuery, filterCategories])

  const RenderCategory = ({ category, depth, value, onChange }: { category: Category; depth: number; value: number[]; onChange: (value: number[]) => void }) => {
    const checked = value.includes(category.id)

    const toggleCategory = () => {
      const newValue = checked ? value.filter(id => id !== category.id) : [...value, category.id]

      onChange(newValue)
    }

    return (
      <Box sx={{ mb: 0.5 }}>
        <FormControlLabel
          sx={{ ml: depth * 4 }}
          control={<Checkbox checked={checked} onChange={toggleCategory} />}
          label={<Typography fontWeight={500}>{category.name}</Typography>}
        />
        {category.children && category.children.length > 0 && (
          <Box sx={{ mt: 0.3 }}>
            {category.children.map(child => (
              <RenderCategory key={child.id} category={child} depth={depth + 1} value={value} onChange={onChange} />
            ))}
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Card>
      <CardHeader title='دسته‌بندی' />
      <CardContent>
        <CustomTextField fullWidth label='جستجوی دسته‌بندی' placeholder='جستجو کنید...' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} sx={{ mb: 4 }} />

        <Controller
          name='categoryIds'
          control={control}
          defaultValue={initialCategoryIds || []}
          render={({ field: { value, onChange } }) => (
            <Box
              sx={{
                maxHeight: '300px',
                overflowY: 'auto',
                p: 2,
                border: theme => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme => theme.palette.grey[600],
                  borderRadius: '4px'
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: theme => theme.palette.grey[800]
                }
              }}
            >
              {isLoading || isFetching ? (
                <Typography>در حال بارگذاری...</Typography>
              ) : error ? (
                <Typography color='error'>خطا در بارگذاری دسته‌بندی‌ها</Typography>
              ) : filteredCategories.length === 0 ? (
                <Typography>دسته‌بندی‌ای یافت نشد</Typography>
              ) : (
                filteredCategories.map(category => <RenderCategory key={category.id} category={category} depth={0} value={value} onChange={onChange} />)
              )}
            </Box>
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 3 }}>
          <CreateCategoryDialog
            type={CategoryType.PRODUCT}
            trigger={
              <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                ثبت دسته‌بندی جدید
              </Typography>
            }
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductCategories

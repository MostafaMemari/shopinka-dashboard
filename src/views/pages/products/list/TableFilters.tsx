// MUI Imports
import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { useQuerySetState } from '@/hooks/useQuerySetState'
import { Category } from '@/types/app/category.type'
import { useCategories } from '@/hooks/reactQuery/category/useCategory'

const TableFilters = ({ filters }: { filters: ReturnType<typeof useQuerySetState> }) => {
  const { data: categories } = useCategories({
    enabled: true,
    params: { take: 200, type: 'PRODUCT' },
    staleTime: 5 * 60 * 1000
  })

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={filters.state.categoryIds}
            onChange={e => {
              const value = e.target.value as unknown as string[]

              if (value.includes('ALL')) {
                filters.setState({ categoryIds: [], page: 1 })
              } else {
                filters.setState({ categoryIds: value.map(Number), page: 1 })
              }
            }}
            slotProps={{
              select: {
                multiple: true,
                displayEmpty: true,
                renderValue: selected => {
                  if ((selected as unknown as string[]).length === 0) {
                    return 'همه دسته‌بندی‌ها'
                  } else
                    return categories?.data?.items
                      ?.filter((c: Category) => (selected as number[]).includes(c.id))
                      .map((c: Category) => c.name)
                      .join(', ')
                }
              }
            }}
          >
            <MenuItem value='ALL'>همه دسته‌بندی‌ها</MenuItem>
            {categories?.data?.items?.map((category: Category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            value={filters.state.type}
            onChange={e => filters.setState({ type: e.target.value as string, page: 1 })}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>نوع محصول</MenuItem>
            <MenuItem value='SIMPLE'>ساده</MenuItem>
            <MenuItem value='VARIABLE'>متغییر</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters

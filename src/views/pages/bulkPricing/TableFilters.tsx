import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import { useQuerySetState } from '@/hooks/useQuerySetState'
import { BulkPricingType } from '@/types/app/bulkPricing.type'

const TableFilters = ({ filters }: { filters: ReturnType<typeof useQuerySetState> }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filters.setState({ type: e.target.value as string, page: 1 })
  }

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            value={filters.state.type || ''}
            onChange={handleChange}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: selected => {
                  if (!selected) {
                    return <em style={{ color: '#9e9e9e' }}>انتخاب نوع تخفیف</em>
                  }

                  return selected === BulkPricingType.PERCENT ? 'درصدی' : 'ثابت'
                }
              }
            }}
          >
            <MenuItem value={BulkPricingType.PERCENT}>درصدی</MenuItem>
            <MenuItem value={BulkPricingType.FIXED}>ثابت</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters

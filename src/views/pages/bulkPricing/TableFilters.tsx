import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@core/components/mui/TextField'
import { useQuerySetState } from '@/hooks/useQuerySetState'
import { BulkPricingType } from '@/types/app/bulkPricing.type'

const TableFilters = ({ filters }: { filters: ReturnType<typeof useQuerySetState> }) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filters.setState({ type: e.target.value as string, page: 1 })
  }

  const handleIsGlobalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filters.setState({ isGlobal: e.target.checked, page: 1 })
  }

  return (
    <CardContent>
      <Grid container spacing={6} alignItems='center'>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            value={filters.state.type || ''}
            onChange={handleTypeChange}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: selected => {
                  if (!selected) {
                    return <span style={{ color: '#9e9e9e' }}>انتخاب نوع تخفیف</span>
                  }

                  return selected === BulkPricingType.PERCENT ? 'درصدی' : 'ثابت'
                }
              }
            }}
          >
            <MenuItem value=''>همه</MenuItem>
            <MenuItem value={BulkPricingType.PERCENT}>درصدی</MenuItem>
            <MenuItem value={BulkPricingType.FIXED}>ثابت</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControlLabel
            control={<Switch checked={filters.state.isGlobal} onChange={handleIsGlobalChange} color='primary' />}
            label={filters.state.isGlobal ? 'تخفیف سراسری' : 'تخفیف اختصاصی'}
          />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters

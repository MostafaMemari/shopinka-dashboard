'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button, CardHeader, Divider } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import { TableListSkeleton } from '@/components/TableSkeleton'
import EmptyBulkPricingState from './EmptyBulkPricingState'
import DesktopBulkPricingTable from './DesktopBulkPricingTable'
import { useBulkPricing } from '@/hooks/reactQuery/bulk-pricing/useBulkPricing'
import { useBulkPricingFilters } from '@/hooks/reactQuery/bulk-pricing/useBulkPricingFilters'
import { BulkPricingItem } from '@/types/app/bulkPricing.type'
import TableFilters from './TableFilters'
import CreateUpdateBulkPricingDIalog from './CreateUpdateBulkPricingDIalog'

const BulkPricingListView = () => {
  const { filters, queryParams } = useBulkPricingFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useBulkPricing({ params: { ...queryParams, title: queryParams.search } })
  const bulkPricing: BulkPricingItem[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <CardHeader title='فیلتر ها' />
      <TableFilters filters={filters} />
      <Divider />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateUpdateBulkPricingDIalog
          trigger={
            <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
              ثبت فروش عمده جدید
            </Button>
          }
        />

        <CustomTextField id='form-props-search' placeholder='جستجوی گالری' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : bulkPricing.length === 0 ? (
        <EmptyBulkPricingState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopBulkPricingTable data={bulkPricing} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={bulkPricing.length}
          />
        </>
      )}
    </Card>
  )
}

export default BulkPricingListView
